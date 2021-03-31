import { Position } from "../types";
import { formatNumber } from "../utils";

export const addressBar = (address: string) => ({
  type: "text",
  text: `Address: ${address}`,
  size: "xs",
  color: "#AAAAAA",
  contents: [],
});

export const tableHeader = () => ({
  type: "box",
  layout: "horizontal",
  paddingTop: "4%",
  contents: [
    {
      type: "text",
      text: "Pool",
      weight: "bold",
      color: "#7645D9",
      align: "start",
      contents: [],
    },
    {
      type: "text",
      text: "Value",
      weight: "bold",
      color: "#7645D9",
      align: "end",
      offsetEnd: "6%",
      contents: [],
    },
  ],
});

export const separator = () => ({
  type: "separator",
});

export const summary = (totalValue: number) => ({
  type: "box",
  layout: "horizontal",
  paddingTop: "4%",
  contents: [
    {
      type: "text",
      text: "Total",
      weight: "bold",
      color: "#452A7AFF",
      align: "start",
      contents: [],
    },
    {
      type: "text",
      text: `$${formatNumber(totalValue)}`,
      weight: "bold",
      color: "#452A7A",
      align: "end",
      contents: [],
    },
  ],
});

export const poolLine = (position: Position) => ({
  type: "box",
  layout: "vertical",
  contents: [
    {
      type: "box",
      layout: "horizontal",
      paddingTop: "4%",
      paddingBottom: "4%",
      contents: [
        {
          type: "box",
          layout: "vertical",
          flex: 8,
          backgroundColor: "#FFFFFF00",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              paddingBottom: "2%",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  width: "60px",
                  contents: position.tokens.map((token) => ({
                    type: "image",
                    url: token.logo,
                    size: "xxs",
                  })),
                },
                {
                  type: "text",
                  text: position.tokens.map((token) => token.symbol).join("-"),
                  weight: "regular",
                  size: "sm",
                  align: "start",
                  gravity: "center",
                  offsetStart: "24%",
                  contents: [],
                },
              ],
            },
            {
              type: "box",
              layout: "horizontal",
              paddingBottom: "2%",
              contents: [
                {
                  type: "text",
                  text: position.tokens
                    .map(
                      (token) =>
                        `${formatNumber(token.balance)} ${token.symbol}`
                    )
                    .join(" + "),
                  size: "xs",
                  align: "start",
                  gravity: "center",
                  contents: [],
                },
              ],
            },
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: `Reward: ${formatNumber(position.reward.balance)} ${
                    position.reward.symbol
                  }`,
                  size: "xs",
                  align: "start",
                  gravity: "center",
                  contents: [],
                },
              ],
            },
          ],
        },
        {
          type: "box",
          layout: "vertical",
          flex: 4,
          backgroundColor: "#FFFFFFFF",
          contents: [
            {
              type: "text",
              text: `$${formatNumber(position.totalValue)}`,
              size: "xs",
              align: "end",
              offsetTop: "6%",
              contents: [],
            },
          ],
        },
      ],
    },
  ],
});
