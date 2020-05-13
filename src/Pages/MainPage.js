import React from "react";
import {Link} from "react-router-dom";
import Spinner from "../Components/tools/Spinner/Spinner";

function MainPage() {
    return (
        <main>
            <h1>Où voudrais tu partir avec moi ?</h1>

            <Spinner/>

            {/* place map hier*/}
            <Link to={"/map"}>On y va !</Link>
        </main>
    )

}

export default MainPage;
