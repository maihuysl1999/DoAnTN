import axios from "axios";
import { TOKEN_SERVICE_URL } from "src/constant/config";
import { getToken } from "src/utils/token";
import { getUser } from "src/utils/user"


export async function getTokens(params){
    let ft_response_array = await getFTTokens().data
    console.log(ft_response_array)
    let nft_response_array = await getNFTTokens().data
    let response = ft_response_array.push(nft_response_array)
    console.log(response)
    return response
}

export async function getFTTokens(params) {
    const response = await axios({
        method: "GET",
        url: `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/?user_id=${getUser()}&token_type=fungible&page=${params}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 30000
    })
    return response
}

export async function getNFTTokens(params) {
    const response = await axios({
        method: "GET",
        url: `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/?user_id=${getUser()}&token_type=non_fungible&page=${params}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 30000
    })
    return response
}

export const createToken = args => {
    const { token_type, token_name, token_symbol, token_standard, token_icon, decimal, initial_supply, max_supply, burnable, pausable, mintable } = args;
    const formData = new FormData();
    const url = `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/`;

    formData.append('token_type', token_type);
    formData.append('token_name', token_name);
    formData.append('token_symbol', token_symbol);
    formData.append('token_standard', token_standard);
    if(token_icon) formData.append('token_icon', token_icon);
    formData.append('decimal', decimal);
    if(max_supply) formData.append('max_supply', max_supply);
    formData.append('initial_supply', initial_supply);
    formData.append('burnable', burnable);
    formData.append('pausable', pausable);
    formData.append('mintable', mintable);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        timeout: 30000
    }

    return axios.post(url, formData, config)
}

export const updateToken = async args => {
    const url = `${TOKEN_SERVICE_URL}/api/v1/token-contracts/update`;
  
    return await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        data: JSON.stringify(args),
        timeout: 30000
    })
}

export async function getTokenDetail(args) {
    const response = await axios({
        method: "GET",
        url: `${TOKEN_SERVICE_URL}/api/v1/token-contracts/?id=${args.token_id}&token_type=${args.token_type}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 30000
    })
    return response
}

export const getContractCode = args => {
    const { url } = args;
    return axios({
        method: "GET",
        url: url,
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    })
}

export const getContractBinary = args => {
    const { url } = args;
    return axios({
        method: "GET",
        url: url,
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    })
}

export const getContractInterface = args => {
    const { url } = args;
    return axios({
        method: "GET",
        url: url,
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    })
}

export const getBridgeContractInterface = args => {
    const {network} = args;

    const url = `${TOKEN_SERVICE_URL}/api/v1/bridge-contracts/abi/`;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        params: {network}
    }

    return axios.get(url, config)
}



export const getNetworks = () => {
    return axios({
        method: "GET",
        url: `${TOKEN_SERVICE_URL}/api/v1/networks/`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 3000
    });
}

export const getTokenByNetwork = args => {
    const {network_name, linked_contract} = args;

    const url = `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/`;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        params: {user_id: getUser(), token_type: 'fungible', network: network_name, linked_contract},
    }

    return axios.get(url, config);
}

export const getLinkedToken = args => {
    const {linked_contract} = args;
    console.log(linked_contract)
    const url = `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/`;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        params: {user_id: getUser(), token_type: 'fungible', linked_contract: linked_contract},
    }

    return axios.get(url, config);
}

export const getERC20ContractInterface = args => {
    const url = `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/interface/`;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        params: {token_standard: 'ERC-20'},
    };

    return axios.get(url, config);
}

// Fabric service

export const getFabricNetworks = () => {
    return axios({
        method: "GET",
        url:`${TOKEN_SERVICE_URL}/api/v1/fabric-networks/`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 3000
    })
}

export const getFabricTokensByNetwork = args => {
    const {network} = args
    return axios({
        method: "GET",
        url:`${TOKEN_SERVICE_URL}/api/v1/fabric-token-contracts/list/?network=${network}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 3000
    })
}

export const getFabricTokenDetail = async args => {
    const { id } = args
    console.log(id)
    const response = await axios({
        method: "GET",
        url:`${TOKEN_SERVICE_URL}/api/v1/fabric-token-contracts/detail/${id}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        timeout: 3000
    })
    return response
} 

export const createFabricToken = args => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": getToken()
        },
        timeout: 30000
    }
    const { token_type, token_name, token_symbol, token_standard, token_icon, decimal, initial_supply, max_supply, burnable, pausable, mintable, network } = args;
    const formData = new FormData();
    const url = `${TOKEN_SERVICE_URL}/api/v1/fabric-token-contracts/`;

    formData.append('token_type', token_type);
    formData.append('token_name', token_name);
    formData.append('token_symbol', token_symbol);
    formData.append('token_standard', token_standard);
    if(token_icon) formData.append('token_icon', token_icon);
    formData.append('decimal', decimal);
    if(max_supply) formData.append('max_supply', max_supply);
    formData.append('initial_supply', initial_supply);
    formData.append('burnable', burnable);
    formData.append('pausable', pausable);
    formData.append('mintable', mintable);
    formData.append('network_id', network);
    formData.append('user_defined_network', network)
    return axios.post(url, formData, config)
}

export const addLinkToken = args => {
    const { fromToken, toToken } = args
    const config = {
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    }
    const url = `${TOKEN_SERVICE_URL}/api/v1.1/token-contracts/${fromToken}/link/`
    const data = { 'contracts': [`${toToken}`],
                    'token_type': 'fungible'}
    return axios.post(url, data, config)
}

export const invokeTransaction = args => {
    const { token_name, network_id, quantity} = args
    const config = {
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    }
    const url = `${TOKEN_SERVICE_URL}/api/v1/fabric-token-contracts/invoke-transaction/?method=mint`;
    const data = {'network_id': `${network_id}`,
                    'token_name': `${token_name}`,
                    'quantity': `${quantity}`}
    return axios.post(url, data, config)
}

export const invokeBurnTransaction = args => {
    const { token_name, network_id, quantity, to_address, to_token} = args
    const config = {
        headers: {
            "Authorization": getToken()
        },
        timeout: 30000
    }
    const url = `${TOKEN_SERVICE_URL}/api/v1/fabric-token-contracts/invoke-transaction/?method=burn`;
    const data = {'network_id': `${network_id}`,
                    'token_name': `${token_name}`,
                    'quantity': `${quantity}`,
                    'to_address': `${to_address}`,
                    'to_token': `${to_token}`}
    return axios.post(url, data, config)
}
