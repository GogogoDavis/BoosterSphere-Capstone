import './Details.css';


export const Details = ({item}) => {
  

console.log(item)

  return (
<>

<h1>Details</h1>
<p>{item.id}</p>
<p>{item.title}</p>
<p>{item.description}</p>
<p className="back" onClick={() => window.history.back()}>Back</p>
</>

  )
}
