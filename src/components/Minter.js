import './Minter.scss'
import { useEffect, useState } from 'react';
import SoldOut from './SoldOut';

import { 
    connectWallet, 
    getCurrentWalletConnected,
    mint,
    getMaxSupply,
    getTotalSupply
    } from '../utils/interact.js';

const Minter = (props)=>{
    
    const [wallet, setWallet] = useState();
    const [status, setStatus] = useState();
    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(async()=>{
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address);
        setStatus(status);
        if(wallet != ""){
            setWalletConnected(true);
        }
        addWalletListener();
    }, [])

    function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWallet(accounts[0]);
              setWalletConnected(true);
            } else {
              setWallet("");
              setWalletConnected(false);
            }
          });
        } else {

        }
    }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);

        if(walletResponse.wallet == ""){
            setWalletConnected(false);
        }
    };

    const className = "minter container " + props.className;

    const greeting_txt = "Hello, world! That's my test NFT project. 375 randomly drawed pictures. I guess it has no value, I created it just to look how it works. " +
    "You can take buying these pictures as support for possible future projects. Or just make me feel that it wasn't time wasting :D "+
    "Just 1 MATIC or any amount you don't mind :)"


    const [isSoldOut, setIsSoldOut] = useState(false);

    const enter_price = document.getElementById('price_enter');


    const onMintPressed = async(cost)=>{
        console.log(walletConnected)
        const {success, status} = await mint(cost);

        setStatus(status);

    }


    const [maxSupply, setMaxSupply] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);

    
    useEffect(async()=>{
        const {maxSupply} = await getMaxSupply();
        const {totalSupply} = await getTotalSupply();
        if(totalSupply == 375){
            setIsSoldOut(true);
        }

        setMaxSupply(maxSupply);
        setTotalSupply(totalSupply);
    }, [])

    return(

        <div className={className}>
            {isSoldOut == false? (
                
                // приветствие
                <div className="row">
                    
                    <div className="col-12 greeting_holder">{greeting_txt}</div>


                    {/* количество токенов */}
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-6 total_b mt-5'>
                                <strong className="count">{totalSupply}</strong> of <strong className="count">{maxSupply}</strong> MTTBAs are minted!
                            </div>
                        </div>
                    </div>

                    {/* чеканка */}
                    {walletConnected == true? (
                        <div className="col-12 container minting_holder">

                            <div className="row">
                                {/* чеканка за любую цену */}
                                <div className="col col-lg-12 col-xl container mint_item">
                                    <div className="row any_price_mint_holder">
                                        <div className="col-12">
                                            <input id="price_enter" className="any_price_mint_item" type="number" placeholder='Enter price'></input>
                                        </div>
                                        <div className="col-12">
                                            <button onClick={()=>onMintPressed(enter_price.value)} id="any_price_mint_btn" className="any_price_mint_item mint_btn">MINT</button>
                                        </div>
                                    </div>
                                </div>
                                {/* ИЛИ */}
                                <h1 className="col col-lg-12 col-xl OR mint_item">OR</h1>
                                {/* чеканка за фиксированную цену */}
                                <div className="col col-lg-12 col-xl mint_item">
                                    <button onClick={()=>onMintPressed(1)} className="mint_btn">MINT for 1 MATIC</button>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="container">
                            <div className="row justify-content-center mt-5">
                                <button onClick={()=>connectWalletPressed()} className="mint_btn col-6">Connect wallet</button>
                            </div>
                        </div>
                    )}

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="info mt-5 col-6">
                                {status}
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <SoldOut></SoldOut>
            )}


        </div>
    )
}

export default Minter;