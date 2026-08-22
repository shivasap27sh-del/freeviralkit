/**
 * Enterprise Provider Circuit Breaker Engine
 * Prevents cascading latency and wasted timeout delays during upstream AI provider outages.
 * 
 * Invariants (Discriminated Union):
 * - CLOSED: Healthy, normal routing. Tracks consecutive failures.
 * - OPEN: Outage detected (>= 3 failures). Skips provider instantly for cooldown duration.
 * - HALF_OPEN: Testing provider recovery with a probe request.
 */

export type CircuitBreakerState =
  | { status: 'CLOSED'; failureCount: number; lastFailureTime?: number }
  | { status: 'OPEN'; openedAt: number; nextAttemptAt: number; failureCount: number }
  | { status: 'HALF_OPEN'; probeInFlight: boolean };

export interface CircuitBreakerConfig {
  failureThreshold: number; // Consecutive failures before tripping (Default: 3)
  cooldownMs: number;       // Time in ms to stay OPEN before testing recovery (Default: 60,000ms)
}

const DEFAULT_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 3,
  cooldownMs: 60_000,
};

class CircuitBreakerRegistry {
  private states = new Map<string, CircuitBreakerState>();
  private config: CircuitBreakerConfig;

  constructor(config = DEFAULT_CONFIG) {
    this.config = config;
  }

  /**
   * Checks whether a provider is available for requests.
   * Returns true if request should proceed, false if circuit is OPEN.
   */
  canExecute(providerName: string): boolean {
    const current = this.states.get(providerName);
    if (!current || current.status === 'CLOSED') {
      return true;
    }

    const now = Date.now();

    if (current.status === 'OPEN') {
      if (now >= current.nextAttemptAt) {
        // Cooldown elapsed -> Transition to HALF_OPEN to test recovery
        this.states.set(providerName, { status: 'HALF_OPEN', probeInFlight: true });
        return true;
      }
      return false; // Circuit still open, skip immediately
    }

    if (current.status === 'HALF_OPEN') {
      // In half-open, allow only one probe request at a time
      if (!current.probeInFlight) {
        this.states.set(providerName, { status: 'HALF_OPEN', probeInFlight: true });
        return true;
      }
      return false;
    }

    return true;
  }

  /**
   * Records a successful execution.
   * Resets failure counter and closes circuit.
   */
  recordSuccess(providerName: string): void {
    this.states.set(providerName, { status: 'CLOSED', failureCount: 0 });
  }

  /**
   * Records a failure.
   * Increments failure counter; trips circuit to OPEN if threshold reached.
   */
  recordFailure(providerName: string, error?: unknown): void {
    const now = Date.now();
    const current = this.states.get(providerName);

    if (!current || current.status === 'CLOSED') {
      const failures = (current?.failureCount || 0) + 1;
      if (failures >= this.config.failureThreshold) {
        // Trip to OPEN
        this.states.set(providerName, {
          status: 'OPEN',
          openedAt: now,
          nextAttemptAt: now + this.config.cooldownMs,
          failureCount: failures,
        });
      } else {
        this.states.set(providerName, {
          status: 'CLOSED',
          failureCount: failures,
          lastFailureTime: now,
        });
      }
      return;
    }

    if (current.status === 'HALF_OPEN') {
      // Probe failed -> Reset back to OPEN with full cooldown
      this.states.set(providerName, {
        status: 'OPEN',
        openedAt: now,
        nextAttemptAt: now + this.config.cooldownMs,
        failureCount: 3,
      });
      return;
    }
  }

  /**
   * Returns remaining cooldown in seconds for an OPEN provider, or 0 if available.
   */
  getRemainingCooldown(providerName: string): number {
    const state = this.states.get(providerName);
    if (!state || state.status !== 'OPEN') return 0;
    const remainingMs = state.nextAttemptAt - Date.now();
    return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
  }

  /**
   * Resets all provider circuit breakers (useful for testing).
   */
  reset(): void {
    this.states.clear();
  }
}

export const circuitBreaker = new CircuitBreakerRegistry();
