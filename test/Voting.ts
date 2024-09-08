import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const bolsonaroCandidate = "bolsonaro";
const lulaCandidate = "lula";

describe("Voting", () => {
  async function deployVotingFeature() {
    const CANDIDATE_NAMES = [bolsonaroCandidate, lulaCandidate];
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(CANDIDATE_NAMES);
    return { voting, bolsonaroCandidate, lulaCandidate };
  }

  describe("Deployment", () => {
    it("should deploy", async () => {
      const { voting } = await loadFixture(deployVotingFeature);

      expect(await voting.totalVotes()).to.equal(0);
    });
  });

  describe("VoteForCandidate", () => {
    it("should vote for the bolsonaro candidate", async () => {
      const { voting, bolsonaroCandidate, lulaCandidate } = await loadFixture(
        deployVotingFeature
      );
      await voting.voteForCandidate(bolsonaroCandidate);
      expect(await voting.totalVotesFor(bolsonaroCandidate)).to.equal(1);
      expect(await voting.totalVotesFor(lulaCandidate)).to.equal(0);
      expect(await voting.totalVotes()).to.equal(1);
    });

    it("should vote for lula candidate", async () => {
      const { voting, bolsonaroCandidate, lulaCandidate } = await loadFixture(
        deployVotingFeature
      );
      await voting.voteForCandidate(lulaCandidate);
      expect(await voting.totalVotesFor(bolsonaroCandidate)).to.equal(0);
      expect(await voting.totalVotesFor(lulaCandidate)).to.equal(1);
      expect(await voting.totalVotes()).to.equal(1);
    });
  });
});
