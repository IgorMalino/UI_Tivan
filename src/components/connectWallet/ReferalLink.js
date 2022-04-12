import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import configData from "../../config.json";
import { useWeb3React } from '@web3-react/core';

const ReferalLink = () => {
    const [ref_link, setRef_link] = useState() 
    const [isClicked, setIsClicked] = useState(false);
    const [data, setData] = useState(0)
    const TVT_CONTRACT = configData.contract_tvt.address;
    const web3reactContext = useWeb3React();

  const getData = async () => {
    const  web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(TVT_CONTRACT)
    
    setData(balance)
  }

  const RefAdrStatus = async (refferer) => {
        console.log("before if")
    if (web3reactContext.account) {

      const web3 = new Web3(Web3.givenProvider);
      const SwapContract = new web3.eth.Contract(configData.contract_presale.abi, configData.contract_presale.address);
      let ch_ref = await SwapContract.methods.getRefInfo(refferer).call();

      if (ch_ref.status) {
        setRef_link({status:true,totalAmount:"",needAmount:"",needMoreAmount:""});
      }else{
        setRef_link({status:false,totalAmount:parseFloat(web3.utils.fromWei(ch_ref.totalAmount, 18).toFixed(2)),needAmount:parseFloat(web3.utils.fromWei(ch_ref.needAmount, 18).toFixed(2)),needMoreAmount:parseFloat(web3.utils.fromWei(ch_ref.needMoreAmount, 18).toFixed(2))});
      }

    }
  }

    useEffect(() => {
        RefAdrStatus(web3reactContext.account)
        // getData()
    }, [])

    

    return (
        <div style={{ marginTop: "10px", padding: "0 10px" }}>
                  You Referral link:  {ref_link?.status ? <> https://tivan.art/ref/{web3reactContext.account} </> : <>To get a referral link you need to buy  {ref_link?.needAmount} TVT.<br/>You have {ref_link?.totalAmount} TVT. Buy more {ref_link?.needMoreAmount} TVT</> }

                </div>
    )
}

export default ReferalLink