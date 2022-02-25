import './SoldOut.scss'

const SoldOut = ()=>{
    const thx_txt = "Sold out! O_O Guys, you are crazy! Thanks for your support :3";

    return(
        <div className="container-fluid sold_out_holder">
            <div className="row justify-content-center">
                <div className="col-12">
                    {thx_txt}
                </div>

            </div>
        </div>
    )
}

export default SoldOut;