import { connect } from "react-redux";

const FourOFourO = () => {
    return(
        <div className="pagecontainer">
            <h1 style={{ fontSize: "100px", textAlign: "center"}}>404 ERROR</h1>
            <p style={{ fontSize: "40px", textAlign: "center"}}>The Question does not exist</p> 
        </div>
    )
}

export default connect()(FourOFourO)