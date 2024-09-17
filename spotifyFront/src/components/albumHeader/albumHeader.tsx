type TProps = {
    img:string
    title:string
}

export const AlbumHeader = (props:TProps) => {
    return (
        <div>
            <div style={{backgroundImage:`url(http://localhost:8000/uploads/${props.img})` ,backgroundSize: "cover",
                backgroundRepeat: "no-repeat",height: '250px', backgroundPosition: "0px -230px",paddingBottom: "50px", width: "75vw", marginLeft:"317px"}}>
                <h1 style={{paddingTop:"170px", paddingLeft:"50px", fontSize:"80px", margin:"0", fontWeight:"700"}}>{props.title}</h1>
            </div>
        </div>
    )
}