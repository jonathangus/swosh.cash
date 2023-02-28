/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Swosh, SwoshInterface } from "../../contracts/Swosh";

const _abi = [
  {
    inputs: [],
    name: "INVALID_PARAM",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_to",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "batchTransferERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e8d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630e47f8d314610067578063486ee94c1461008357806364511e441461009f57806395da0adc146100bb578063e93b1491146100d7578063ec47b179146100f3575b600080fd5b610081600480360381019061007c91906108d8565b61010f565b005b61009d600480360381019061009891906109ea565b610227565b005b6100b960048036038101906100b491906108d8565b6102f4565b005b6100d560048036038101906100d09190610ab3565b61040c565b005b6100f160048036038101906100ec9190610b48565b6104bd565b005b61010d60048036038101906101089190610ab3565b6105f1565b005b81819050868690501461014e576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b83839050868690501461018d576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b8686905081101561021e5761020d8787838181106101b1576101b0610c31565b5b90506020020160208101906101c69190610c60565b8686848181106101d9576101d8610c31565b5b90506020020160208101906101ee9190610c60565b85858581811061020157610200610c31565b5b905060200201356106a2565b8061021790610cc6565b9050610190565b50505050505050565b838390508787905014610266576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b878790508110156102ea576102d988888381811061028a57610289610c31565b5b905060200201602081019061029f9190610c60565b878787858181106102b3576102b2610c31565b5b905060200201358686868181106102cd576102cc610c31565b5b90506020020135610716565b806102e390610cc6565b9050610269565b5050505050505050565b838390508686905014610333576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818190508686905014610372576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b86869050811015610403576103f287878381811061039657610395610c31565b5b90506020020160208101906103ab9190610c60565b8686848181106103be576103bd610c31565b5b90506020020160208101906103d39190610c60565b8585858181106103e6576103e5610c31565b5b9050602002013561078d565b806103fc90610cc6565b9050610375565b50505050505050565b81819050858590501461044b576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b858590508110156104b5576104a486868381811061046f5761046e610c31565b5b90506020020160208101906104849190610c60565b8585858581811061049857610497610c31565b5b905060200201356106a2565b806104ae90610cc6565b905061044e565b505050505050565b8383905088889050146104fc576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b85859050888890501461053b576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b888890508110156105e6576105d589898381811061055f5761055e610c31565b5b90506020020160208101906105749190610c60565b88888481811061058757610586610c31565b5b905060200201602081019061059c9190610c60565b8787858181106105af576105ae610c31565b5b905060200201358686868181106105c9576105c8610c31565b5b90506020020135610716565b806105df90610cc6565b905061053e565b505050505050505050565b818190508585905014610630576040517f22ee6ae700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b8585905081101561069a5761068986868381811061065457610653610c31565b5b90506020020160208101906106699190610c60565b8585858581811061067d5761067c610c31565b5b9050602002013561078d565b8061069390610cc6565b9050610633565b505050505050565b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd3384846040518463ffffffff1660e01b81526004016106df93929190610d2c565b600060405180830381600087803b1580156106f957600080fd5b505af115801561070d573d6000803e3d6000fd5b50505050505050565b8373ffffffffffffffffffffffffffffffffffffffff1663f242432a338585856040518563ffffffff1660e01b81526004016107559493929190610d9a565b600060405180830381600087803b15801561076f57600080fd5b505af1158015610783573d6000803e3d6000fd5b5050505050505050565b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd3384846040518463ffffffff1660e01b81526004016107ca93929190610d2c565b6020604051808303816000875af11580156107e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080d9190610e2a565b50505050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126108425761084161081d565b5b8235905067ffffffffffffffff81111561085f5761085e610822565b5b60208301915083602082028301111561087b5761087a610827565b5b9250929050565b60008083601f8401126108985761089761081d565b5b8235905067ffffffffffffffff8111156108b5576108b4610822565b5b6020830191508360208202830111156108d1576108d0610827565b5b9250929050565b600080600080600080606087890312156108f5576108f4610813565b5b600087013567ffffffffffffffff81111561091357610912610818565b5b61091f89828a0161082c565b9650965050602087013567ffffffffffffffff81111561094257610941610818565b5b61094e89828a0161082c565b9450945050604087013567ffffffffffffffff81111561097157610970610818565b5b61097d89828a01610882565b92509250509295509295509295565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109b78261098c565b9050919050565b6109c7816109ac565b81146109d257600080fd5b50565b6000813590506109e4816109be565b92915050565b60008060008060008060006080888a031215610a0957610a08610813565b5b600088013567ffffffffffffffff811115610a2757610a26610818565b5b610a338a828b0161082c565b97509750506020610a468a828b016109d5565b955050604088013567ffffffffffffffff811115610a6757610a66610818565b5b610a738a828b01610882565b9450945050606088013567ffffffffffffffff811115610a9657610a95610818565b5b610aa28a828b01610882565b925092505092959891949750929550565b600080600080600060608688031215610acf57610ace610813565b5b600086013567ffffffffffffffff811115610aed57610aec610818565b5b610af98882890161082c565b95509550506020610b0c888289016109d5565b935050604086013567ffffffffffffffff811115610b2d57610b2c610818565b5b610b3988828901610882565b92509250509295509295909350565b6000806000806000806000806080898b031215610b6857610b67610813565b5b600089013567ffffffffffffffff811115610b8657610b85610818565b5b610b928b828c0161082c565b9850985050602089013567ffffffffffffffff811115610bb557610bb4610818565b5b610bc18b828c0161082c565b9650965050604089013567ffffffffffffffff811115610be457610be3610818565b5b610bf08b828c01610882565b9450945050606089013567ffffffffffffffff811115610c1357610c12610818565b5b610c1f8b828c01610882565b92509250509295985092959890939650565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610c7657610c75610813565b5b6000610c84848285016109d5565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000819050919050565b6000610cd182610cbc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d0357610d02610c8d565b5b600182019050919050565b610d17816109ac565b82525050565b610d2681610cbc565b82525050565b6000606082019050610d416000830186610d0e565b610d4e6020830185610d0e565b610d5b6040830184610d1d565b949350505050565b600082825260208201905092915050565b50565b6000610d84600083610d63565b9150610d8f82610d74565b600082019050919050565b600060a082019050610daf6000830187610d0e565b610dbc6020830186610d0e565b610dc96040830185610d1d565b610dd66060830184610d1d565b8181036080830152610de781610d77565b905095945050505050565b60008115159050919050565b610e0781610df2565b8114610e1257600080fd5b50565b600081519050610e2481610dfe565b92915050565b600060208284031215610e4057610e3f610813565b5b6000610e4e84828501610e15565b9150509291505056fea26469706673582212204f732c692de39996017c1b1bbb242a46071970a86ae33e32a4b57a6a89bc704864736f6c63430008120033";

type SwoshConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwoshConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Swosh__factory extends ContractFactory {
  constructor(...args: SwoshConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Swosh> {
    return super.deploy(overrides || {}) as Promise<Swosh>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Swosh {
    return super.attach(address) as Swosh;
  }
  override connect(signer: Signer): Swosh__factory {
    return super.connect(signer) as Swosh__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwoshInterface {
    return new utils.Interface(_abi) as SwoshInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Swosh {
    return new Contract(address, _abi, signerOrProvider) as Swosh;
  }
}
