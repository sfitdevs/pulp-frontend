'use server'
import Navbar from '../../components/navbar'
import Header from '../../components/header'

async function getData(id) {
  const res = await fetch(`https://pulp.deta.dev/api/${id}`)
  return res.json()
}

async function page({ params }) {

  let data = await getData(params.pulpid)
  const pulpContent = data.content == undefined ? "Pulp Not Found" : data.content;
  const titleContent = data.title !== "" ? data.title : "No title specified";
  const language = data.language !== "" ? data.language : "txt";

  const imageArr = data.images == undefined ? [""] : data.images

  return (
    <>
      <Navbar />
      <Header />
      <div className='open'>
        <h2>Title: {titleContent}</h2>

        <div className='content-box'>
          <pre><code>{pulpContent}</code></pre>
        </div>
        <h3 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "15px"
        }}>Pulp ID: {data.key} | Views: {data.views} | Language: {language}</h3>
        {imageArr.map((id) => {
          return (
            <>
              <div className='image-content' key={id}>
                <h3>Images: </h3>
                <img key={id} src={`https://pulp.deta.eu.org/image/${id}`} alt="No Images found" />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default page