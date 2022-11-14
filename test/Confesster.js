const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Confesster", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployConfessterFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Confesster = await ethers.getContractFactory("Confesster");
    const confesster = await Confesster.deploy();
    await confesster.deployed();

    return { confesster, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy successfuly", async function () {
      // We use loadFixture to run the fixture and get the returned values
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      expect(await confesster.name()).to.equal("Confesster");
      expect(await confesster.address).to.be.properAddress;
    });
  });

  describe("Confessions", function () {
    it("Should create a confession", async function () {
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      await confesster.createConfession(
        "This is a test confession",
        "hash",
        "love"
      );

      const confession = await confesster.confessions(1);

      expect(await confesster.confessionsCount()).to.equal(1);
      expect(confession.id).to.equal(1);
      expect(confession.message).to.equal("This is a test confession");
      expect(confession.hash).to.equal("hash");
      expect(confession.category).to.equal("love");
      expect(confession.author).to.equal(owner.address);
    });

    it("Should not create a confession if message is empty", async function () {
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      await expect(
        confesster.createConfession("", "hash", "love")
      ).to.be.revertedWith("Message must not be empty");
    });
  });

  describe("Coffees", function () {
    it("Should buy coffee to the author", async function () {
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      const initialBalance = await ethers.provider.getBalance(
        otherAccount.address
      );

      const expectedBalance = initialBalance.add(
        ethers.utils.parseEther("0.0001")
      );

      await confesster.buyCoffee(otherAccount.address, "Enjoy your coffee!", {
        value: ethers.utils.parseEther("0.0001"),
      });

      const finalBalance = await ethers.provider.getBalance(
        otherAccount.address
      );

      expect(await confesster.coffeesCount()).to.equal(1);
      expect(finalBalance).to.equal(expectedBalance);
    });
  });

  describe("Events", function () {
    it("Should emit an event when a confession is created", async function () {
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      await expect(
        confesster.createConfession("This is a test confession", "hash", "love")
      )
        .to.emit(confesster, "ConfessionCreated")
        .withArgs(
          1, //id
          "hash", // hash
          "This is a test confession", // message
          "love", // category
          owner.address, // author
          anyValue // when
        );
    });

    it("Should emit an event when a coffee is bought", async function () {
      const { confesster, owner, otherAccount } = await loadFixture(
        deployConfessterFixture
      );

      await expect(
        confesster.buyCoffee(otherAccount.address, "Enjoy your coffee!", {
          value: ethers.utils.parseEther("0.0001"),
        })
      )
        .to.emit(confesster, "CoffeeBought")
        .withArgs(
          1, //id
          owner.address, // buyer
          otherAccount.address, // author
          "Enjoy your coffee!", // message
          anyValue // when
        );
    });
  });
});
