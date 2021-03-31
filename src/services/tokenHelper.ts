import { LPPoolInfo, PoolInfo, SinglePoolInfo, TokenBalance } from "../types";

import BEP20 from "../abi/BEP20.json";
import PancakePair from "../abi/PancakePair.json";
import { PriceService } from "./priceService";
import { Web3Service } from "./web3Service";
import { toDecimal } from "../utils";

export class TokenHelper {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly priceService: PriceService
  ) {}

  //   BEP20
  async getTokenSymbol(address: string) {
    const tokenContract = this.web3Service.getContract(BEP20.abi, address);
    const tokenSymbol: string = await tokenContract.methods.symbol().call();
    return tokenSymbol;
  }

  async getTokenDecimals(address: string) {
    const tokenContract = this.web3Service.getContract(BEP20.abi, address);
    const tokenDecimals = await tokenContract.methods.decimals().call();
    return parseInt(tokenDecimals);
  }

  //   Pair
  async getTokenPair(lpAddress: string) {
    const lpContract = this.web3Service.getContract(PancakePair.abi, lpAddress);
    const token0Address = (
      await lpContract.methods.token0().call()
    ).toLowerCase();
    const token1Address = (
      await lpContract.methods.token1().call()
    ).toLowerCase();
    const token0Symbol = await this.getTokenSymbol(token0Address);
    const token0Decimals = await this.getTokenDecimals(token0Address);
    const token1Symbol = await this.getTokenSymbol(token1Address);
    const token1Decimals = await this.getTokenDecimals(token1Address);
    return {
      token0Symbol,
      token0Address,
      token0Decimals,
      token1Symbol,
      token1Address,
      token1Decimals,
    };
  }

  async getLPUnderlyingBalance(poolInfo: LPPoolInfo & TokenBalance) {
    const lpContract = this.web3Service.getContract(
      PancakePair.abi,
      poolInfo.lpAddress
    );
    const totalSupply = toDecimal(
      await lpContract.methods.totalSupply().call(),
      poolInfo.tokenDecimals
    ).toNumber();
    const reserve = await lpContract.methods.getReserves().call();
    const reserve0 = toDecimal(
      reserve._reserve0,
      poolInfo.token0Decimals
    ).toNumber();
    const reserve1 = toDecimal(
      reserve._reserve1,
      poolInfo.token1Decimals
    ).toNumber();
    const share = poolInfo.tokenBalance / totalSupply;
    const token0Balance = share * reserve0;
    const token1Balance = share * reserve1;
    const lpInfo = {
      totalSupply,
      reserve0,
      reserve1,
      token0Balance,
      token1Balance,
    };
    return lpInfo;
  }

  //   Price
  async getRewardPrice(poolInfo: PoolInfo) {
    const rewardPrice = await this.priceService.getPrice(
      poolInfo.rewardAddress
    );
    return {
      rewardPrice,
    };
  }

  async getSingleStakingPrice(poolInfo: SinglePoolInfo) {
    const tokenPrice = await this.priceService.getPrice(poolInfo.tokenAddress);
    return {
      tokenPrice,
    };
  }

  async getLPStakingPrice(poolInfo: LPPoolInfo) {
    let [token0Price, token1Price] = await Promise.all([
      this.priceService.getPrice(poolInfo.token0Address),
      this.priceService.getPrice(poolInfo.token1Address),
    ]);
    return {
      token0Price,
      token1Price,
    };
  }
}
