import './style.css'

import kuzu_wasm from '@kuzu/kuzu-wasm'

document.querySelector('#app').innerHTML = `
  <div>
    Hello World
  </div>
`

window.onload = async () => {
  const kuzu = await kuzu_wasm();
  const db = await kuzu.Database()
  const conn = await kuzu.Connection(db)
  await conn.execute(`CREATE NODE TABLE User(name STRING, age INT64, PRIMARY KEY (name))`)
  await conn.execute(`CREATE (u:User {name: 'Alice', age: 35});`)
  const res = await conn.execute(`MATCH (a:User) RETURN a.*;`)
  const res_json = JSON.parse(res.table.toString());
  console.log(res_json)
}