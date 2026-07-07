const { Client } = require('pg');

async function test() {
  const client = new Client({
    connectionString: 'postgresql://xata:f0dfQQat5CHXPRbaXe09CVlIyxg75HQZYXyCpHqFHIqWu3gxlJagNlXZ695jfNOf@vcav7p6jfh2sv44idd3q6uhd74.us-east-1.xata.tech/xata?sslmode=require',
  });

  await client.connect();

  try {
    const res = await client.query('SELECT * FROM posts LIMIT 2;');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}
test();
