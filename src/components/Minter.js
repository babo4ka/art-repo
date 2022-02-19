import './Minter.scss'
import robot_img from '../robot.png';

const Minter = (props)=>{
    const className = "minter container " + props.className;

    const greeting_txt = "Hi! My name is Marco! I don’t know who made me :( I just woke up in a dump." +
        "I was confused, I know nothing about everything around me, exepting some information that was embedded inside me." +
        "But I found some interesting here! It’s called paintings." +
        "I liked it so much, so I decided to make my own, and I want to show them to you :) Meet My Try To Be Artist"

    const price_txt = "You can offer any price you want, or just buy it for 1 MATIC "+
    "I’ll be glad if you estimate my first efforts"

    return(
        <div className={className}>
            
            <div className="row">
                <div className="col-12 greeting_holder">{greeting_txt}</div>

                <div className="col-12 container-fluid">

                    <div className="row robot_talk_holder">

                        <div className="col-2">
                            <img id="robot_img" src={robot_img}></img>
                        </div>

                        <div className="col-6 price_talk">{price_txt}</div>

                    </div>
                </div>

                <div className="col-12 container minting_holder">
                    <div className="row">
                        <div className="col col-lg-12 col-xl container mint_item">
                            <div className="row any_price_mint_holder">
                                <div className="col-12">
                                    <input id="price_enter" className="any_price_mint_item" type="number" placeholder='Enter price'></input>
                                </div>
                                <div className="col-12">
                                    <button id="any_price_mint_btn" className="any_price_mint_item mint_btn">MINT</button>
                                </div>
                            </div>
                        </div>

                        <h1 className="col col-lg-12 col-xl OR mint_item">OR</h1>

                        <div className="col col-lg-12 col-xl mint_item">
                            <button className="mint_btn">MINT for 1 MATIC</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Minter;