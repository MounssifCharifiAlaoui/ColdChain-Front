
export default function Card({ text, val1, val2, icon, sign, comment }) {
    return (
        <div className='d-flex p-4 rounded-3 bg-white flex-column w-25'style={{ height: "150px", border : "solid 1px #e8e8e4" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small fw-bolder mb-0">{text}</span>
                <span><i className={icon}></i></span>
            </div>

            <div className="fs-4 fw-bold">{val1} {sign}</div>
            <div>{val2} <span className="text-muted small">{comment}</span> </div>
        </div>
    )
}
