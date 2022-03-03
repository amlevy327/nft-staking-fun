const { expect } = require('chai');

describe('Asset contract', () => {
  let AssetContract, assetContract, owner, addr1, addr2;
  let ADDRESS_0x0 = "0x0000000000000000000000000000000000000000"
  let name = "MyAssets"
  let symbol = "MA"

  beforeEach(async () => {
    [owner, addr1, addr2, _] = await ethers.getSigners();

    AssetContract = await ethers.getContractFactory('Asset');
    assetContract = await AssetContract.deploy(name, symbol);
  })

  describe('Deployment', () => {
    // Ownable - owner
    it('tracks the owner', async () => {
      expect(await assetContract.connect(owner).owner()).to.equal(owner.address)
    })
    // ERC721 - name
    it('tracks the name', async () => {
      expect(await assetContract.connect(owner).name()).to.equal(name)
    })
    // ERC721 - symbol
    it('tracks the name', async () => {
      expect(await assetContract.connect(owner).symbol()).to.equal(symbol)
    })
  })

  describe('Mint', () => {
    describe('Success', () => {
      it('mints correctly', async () => {
        await assetContract.connect(owner).mintAsset(addr1.address)
        expect(await assetContract.ownerOf(1)).to.equal(addr1.address)

        await assetContract.connect(owner).mintAsset(addr2.address)
        expect(await assetContract.ownerOf(2)).to.equal(addr2.address)
      })

      it('emits a AssetMinted event ', async () => {
        await expect(assetContract.connect(owner).mintAsset(addr1.address))
          .to.emit(assetContract, 'AssetMinted')
          .withArgs(
            addr1.address,
            1
          );
      })
    })

    describe('Failure', () => {
      // mintAsset - caller must be owner
      it('mintAsset reverts if caller is not owner', async () => {
        await expect(assetContract.connect(addr1).mintAsset(addr1.address)).to.be.revertedWith('Ownable: caller is not the owner')
      })
    })
  })
})