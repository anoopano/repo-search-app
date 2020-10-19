import React from 'react';
import ListAll from './ListAll';

//list user repositories if the user checked the search-by-user checkbox
function ListUserRepos({ data, error, addRepos }) {
    return (
        <div>
            {
                ((data.length !== 0 || error) && (data.message !== "Not Found") || data.total_count >= 0) ?
                    data.map(item => (
                        <ListAll item={item} addRepos={addRepos} />
                    ))
                    : null
            }
        </div>
    )
}

export default ListUserRepos
