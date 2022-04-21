import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Web3 from "web3";

import configData from "../../../../config.json";

function ERC20TTVTBalance() {
  //   const { data: assets, fetchERC20Balances } = useERC20Balances(props);

  const [data, setData] = useState();

  const getData = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getBalance(configData.contract_tvt.address);
    setData(accounts);
  };

  useEffect(() => {
    getData();
  }, []);

  var TVT_B = {
    token_address: configData.contract_tvt.address,
    name: "Tivan",
    symbol: "TVT",
    logo: null,
    thumbnail: null,
    decimals: "18",
    balance: "0",
  };
  //   for(var i in assets)
  //     if (assets [i]['token_address'].toLowerCase()===TVT_CONTRACT.toLowerCase()){
  //       TVT_B = assets [i];

  //     }

  //   function addToken () {
  //     const web3 = new Web3(Web3.givenProvider);
  //     try {
  //       web3.currentProvider.sendAsync({
  //         method: 'wallet_watchAsset',
  //         params: {
  //           'type': 'ERC20',
  //           'options': {
  //             'address': '0x0b260a12CB0F59d24fDD1D56cA5569f3925e233A',
  //             'symbol': 'TVT',
  //             'decimals': '18',
  //             'image': 'http://bscscan.com/images/main/empty-token.png',
  //           },
  //         },
  //         id: Math.round(Math.random() * 100000)
  //       }, function (err, data) {
  //         if (!err) {
  //           if (data.result) {
  //             console.log('Token added');
  //           } else {
  //             console.log(data);
  //             console.log('Some error');
  //           }
  //         } else {
  //           console.log(err.message);
  //         }
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  return (
    <>
      <div
        style={{
          fontSize: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data && data} TVT{" "}
        <FontAwesomeIcon
          onClick={() => getData()}
          style={{ height: "45px", marginLeft: "5px", cursor: "pointer" }}
          icon={faSync}
        />
      </div>
    </>
  );
}
export default ERC20TTVTBalance;
