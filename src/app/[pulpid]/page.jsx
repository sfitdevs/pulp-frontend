'use server'
import Navbar from '../../components/navbar'
import Header from '../../components/header'
async function getData(id) {
  const res = await fetch(`https://pulp.deta.dev/api/${id}`)
  return res.json()
}

async function page({ params }) {
  let data = await getData(params.pulpid)
  return (
    <>
      <div className="content-box">
        <pre>
          <code>{data.content}</code>
        </pre>
      </div>

    </>
  )
}

export default page