import '../styles/List.css';
import config from '../config';
import LazyLoad from 'react-lazyload';

const List = ({data, reFetch}) => {
  function deleteEntity(id) {
    const ADDRESS = config.API.ADDRESS + ":" + config.API.PORT;
    fetch(ADDRESS + "/api", {
    
        // Adding method type
        method: "DELETE",
        
        // Adding body or contents to send
        body: JSON.stringify({id}),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then(res => res.text())
    .then(message => {console.log(message)})
    .then(() => reFetch())
  }

  return (
    <div className="list">
        {data.map((e, i) => {
            try {
                const url = new URL(e.link);
                const favicon = 'http://www.google.com/s2/favicons?domain=' + url.hostname;
                return <LazyLoad key={i} height={200} offset={200}>
                    <div className="list-row">
                        <div className="img-content-grp">
                            <img src={favicon} />
                            <div className="list-entity-content">
                                <div className='row-name'><span className="num">{i + 1}.</span> {e.name} <a target="_blank" href={e.link}>({url.hostname})</a></div>
                                <div>{e.title}</div>
                                <div className="tags">
                                    {e.tag.map((e, i) => {
                                        return <div key={i}>{e}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="delete" onClick={() => deleteEntity(e._id)}>&#xf2ed;</div>
                    </div>
                </LazyLoad>
            } catch (e) {
                console.log(e);
            }
        })}
    </div>
  )
}

export default List