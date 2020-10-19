import React, { useState } from 'react';
import ListAll from './ListAll';
// list repositories if the user checked the search by repository checkbox

function ListRepositories({ data, addRepos }) {

    return (
        <div>
            {(data.total_count >= 0) ?
                <div>
                    {data.items.map(item => (
                        <ListAll item={item} addRepos={addRepos} />
                    ))}
                </div> : null
            }
        </div>
    )
}

export default ListRepositories
