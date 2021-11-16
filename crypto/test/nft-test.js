const { expect } = require('chai');

const { deployNFTContract } = require('../scripts/nft-contract');

describe('TheCryptoPurgeNFT', function () {
  it(`should return a base64 string when a NFT is minted`, async function () {
    // Compiling our Smart Contract and Deploy our contract to the local blockchain.
    const contract = await deployNFTContract();

    expect(await contract.getTotalCollection()).to.equal(0);

    // Mint a NFT.
    const txn = await contract.mintNFT({
      index: 0,
      name: 'player',
      imageUri: 'https://raw.githubusercontent.com/proyecto26/Phaser-Workshop/client-server/client/assets/images/player.png',
      health: 1000,
      maxHealth: 1000,
      attackDamage: 100
    });
    // Wait for the transaction to be mined.
    await txn.wait();

    // Get the value of the NFT's URI.
    const returnedTokenUri = await contract.tokenURI(0);

    expect(await contract.getTotalCollection()).to.equal(1);
    expect(returnedTokenUri).to.includes('data:application/json;base64,');
  });
});
