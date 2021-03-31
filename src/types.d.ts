export type SinglePoolInfo = {
  poolId: number;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenLogo: string;
  rewardAddress: string;
  rewardSymbol: string;
  rewardDecimals: number;
  rewardLogo: string;
  type: "single";
};

export type LPPoolInfo = {
  poolId: number;
  lpAddress: string;
  tokenDecimals: number;
  token0Address: string;
  token0Symbol: string;
  token0Decimals: number;
  token0Logo: string;
  token1Address: string;
  token1Symbol: string;
  token1Decimals: number;
  token1Logo: string;
  rewardAddress: string;
  rewardSymbol: string;
  rewardDecimals: number;
  rewardLogo: string;
  type: "lp";
};

export type PoolInfo = SinglePoolInfo | LPPoolInfo;

export type TokenBalance = {
  tokenBalance: number;
};

export type RewardBalance = {
  rewardBalance: number;
};

export type LPBalance = {
  totalSupply: number;
  reserve0: number;
  reserve1: number;
  token0Balance: number;
  token1Balance: number;
};

export type LPPrice = {
  token0Price: number;
  token1Price: number;
};

export type SinglePrice = {
  tokenPrice: number;
};

export type RewardPrice = {
  rewardPrice: number;
};

export type SingleStaking = SinglePoolInfo &
  TokenBalance &
  RewardBalance &
  RewardPrice &
  SinglePrice;

export type LPStaking = LPPoolInfo &
  TokenBalance &
  RewardBalance &
  RewardPrice &
  LPBalance &
  LPPrice;

export type Staking = SingleStaking | LPStaking;

export type Token = {
  symbol: string;
  address: string;
  logo: string;
  balance: number;
  price?: number;
};

export type Position = {
  tokens: Token[];
  balance: number;
  reward?: Token;
  totalValue: number;
};
