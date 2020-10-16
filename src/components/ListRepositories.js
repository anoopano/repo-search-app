import React from 'react'

function ListRepositories({ data, addRepos }) {
    return (
        <div>
            {(data.total_count >= 0) ?
                <div>
                    {data.total_count} results found
                {data.items.map(item => (
                        <li key={item.id}>{item.name}
                            <button onClick={() => addRepos(item)}>add</button>

                        </li>
                    ))}

                </div> : null
            }
        </div>
    )
}

export default ListRepositories
