import React from 'react'

function Pagination({  paginationFn, page }) {
    return (
        <div className="d-flex justify-content-center mt-3 mb-3">
            <ul className="pagination">
                {page !== 1 && <li className="page-item">
                    <a className="page-link" href="#" onClick={()=>paginationFn(page-1)}>{page - 1}</a>
                </li>}
                <li className="page-item active">
                    <a className="page-link" href="#" >{page}</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" onClick={()=>paginationFn(page+1)} >{page + 1}</a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination


