import { Button, Image, } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { web3, DAOContract, sErc20Contract } from "../utils/contract";
import './index.css';

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
// TODO change according to your configuration
const GanacheTestChainName = 'Ganache Test Chain'
const GanacheTestChainRpcUrl = 'HTTP://127.0.0.1:8545'



const StudentSocietyPage = () => {
    interface DataType {
        key: string;
        index: number;
        name: string;
    }
    interface Prop {
        index: number;
        name: string;
        vote:number;
        valid:number;
    }
    const [account, setAccount] = useState('')
    const [index_ifo, setindex_ifo] = useState<undefined | string>(undefined)
    const [index_promote, setindex_promote] = useState<undefined | string>(undefined)
    const [strat_time, setstrat_time] = useState<undefined | string>(undefined)
    const [duration, setduration] = useState<undefined | string>(undefined)
    const [propname, setPropname] = useState<undefined | string>(undefined)
    const [index_vote, setindex_vote] = useState<undefined | string>(undefined)
    const [index_end, setindex_end] = useState<undefined | string>(undefined)
    const [gain, setGain] = useState<undefined | string>(undefined)
    const [sum, setSum] = useState<undefined | string>(undefined)
    const [managerAccount, setManagerAccount] = useState('')
    const [promote_cost, setPromote_cost] = useState('')
    const [vote_cost, setVote_cost] = useState('')
    const columns: ColumnsType<DataType> = [
        {
            title: 'INDEX',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },];
    let [dataSource, setdataSource] = useState<undefined | DataType[]>(undefined)
    // let dataSource: DataType[] = [
    //     {
    //         key: '2',
    //         index: 123,
    //         name: 'cscc',
    //     },

    // ];
    useEffect(() => {
        // 初始化检查用户是否已经连接钱包
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        const initCheckAccounts = async () => {
            // @ts-ignore

            const { ethereum } = window;
            if (Boolean(ethereum && ethereum.isMetaMask)) {
                // 尝试获取连接的用户账户
                const accounts = await web3.eth.getAccounts()
                if (accounts && accounts.length) {
                    setAccount(accounts[0])
                }
            }
        }
        initCheckAccounts()
    }, [])

    useEffect(() => {
        const getInfo = async () => {
            if (DAOContract) {
                const ma = await DAOContract.methods.manager().call()
                setManagerAccount(ma)
                const pc = await DAOContract.methods.PROMOTE_COST().call()
                setPromote_cost(pc)
                const vc = await DAOContract.methods.VOTE_COST().call()
                setVote_cost(vc)
                const ga = await DAOContract.methods.GAIN().call()
                let ssuumm=await DAOContract.methods.sum().call()
                ssuumm--
                setSum(ssuumm)
            } else {
                alert('Contract not exists.')
            }
        }

        getInfo()
    }, [])

    const onClaimgiveToken = async () => {
        if (account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (sErc20Contract) {
            try {
                await sErc20Contract.methods.giveToken().send({
                    from: account
                })
                alert('You have claimed csc Token.')
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }
    ///////////////////////////////////////////////////////////////start
    // useEffect(() => {
    //     const onClaimTable = async () => {
    //         let temp: DataType = {
    //             key: '0',
    //             index: 0,
    //             name: 'a',
    //         };
    //         let i: number = 1;
    //         let sum: number = 1;
    //         if (DAOContract) {
    //             try {
    //                 sum = await DAOContract.methods.sum().call({
    //                     from: account
    //                 })
    //             } catch (error: any) {
    //                 alert(error.message)
    //             }

    //         } else {
    //             alert('Contract not exists.')
    //         }
    //         let tempArr: DataType[] = [
    //             {
    //                 key: '2',
    //                 index: 123,
    //                 name: 'shit',
    //             },

    //         ];
    //         tempArr.splice(0, tempArr.length)//清空datasource
    //         setdataSource(tempArr)
    //         for (i = 1; i < sum; i++) {
    //             temp.key = String(i)
    //             //temp.key = '1'
    //             temp.index = i
    //             if (DAOContract) {
    //                 try {
    //                     temp.name = await DAOContract.methods.getName(i).call({
    //                         from: account
    //                     })
    //                 } catch (error: any) {
    //                     alert(error.message)
    //                 }

    //             } else {
    //                 alert('Contract not exists.')
    //             }
    //             // alert(temp.name)
    //             tempArr.push(temp)
    //         }
    //         setdataSource(tempArr)
    //         alert(sum)
    //     }
    // onClaimTable()    
    // }, [])
    //////////////////////////////end
    const onGetIfo = async () => {

        if (!index_ifo) {
            alert('ifo for that index is invalid')
            return
        }
        let temp: Prop = {
            index: 0,
            name: 'a',
            vote:0,
            valid:0,
        };
        if (DAOContract) {
            try {
                temp.name = await DAOContract.methods.getName(index_ifo).call({
                    from: account
                })
                temp.vote = await DAOContract.methods.getVote(index_ifo).call({
                    from: account
                })
                temp.valid = await DAOContract.methods.getEnd(index_ifo).call({
                    from: account
                })
            } catch (error: any) {
                alert(error.message)
            }
            if(temp.valid==0)
            {
                alert('Invalid proposal')
            }
            else if(temp.valid==1)
            {
                alert('index: '+index_ifo+'\n'+'name: '+temp.name+'\n'+'vote: '+temp.vote)
            }

        } else {
            alert('Contract not exists.')
        }

    }

    const onPromoteProposal = async () => {
        if (account === '') {
            alert('You have not connected wallet yet')
            return
        }
        if (!(strat_time && duration && propname)) {
            alert('information not complete')
            return
        }
        if (sErc20Contract && DAOContract) {
            try {
                await sErc20Contract.methods.approve(DAOContract.options.address, promote_cost).send({
                    from: account
                })

                await DAOContract.methods.StartProposal(strat_time, duration, propname).send({
                    from: account
                })
                alert('You promote a proposal')
            }
            catch (error: any) {
                alert(error.message)
            }
        }
        else {
            alert('Contract not exists or information not complete')
        }
        // onClaimTable();

    }
    const onVote = async () => {
        if (account === '') {
            alert('You have not connected wallet yet')
            return
        }
        if (!index_vote) {
            alert('index to vote not complete')
            return
        }
        if (sErc20Contract && DAOContract) {
            try {
                await sErc20Contract.methods.approve(DAOContract.options.address, vote_cost).send({
                    from: account
                })
                await DAOContract.methods.vote(true, index_vote).send({
                    from: account
                })
                alert('You vote a proposal')
            }
            catch (error: any) {
                alert(error.message)
            }
        }
        else {
            alert('Contract not exists or information not complete')
        }
    }

    const onVoteAgainst = async () => {
        if (account === '') {
            alert('You have not connected wallet yet')
            return
        }
        if (!index_vote) {
            alert('index to vote not complete')
            return
        }
        if (sErc20Contract && DAOContract) {
            try {
                await sErc20Contract.methods.approve(DAOContract.options.address, vote_cost).send({
                    from: account
                })
                await DAOContract.methods.vote(false, index_vote).send({
                    from: account
                })
                alert('You against a proposal')
            }
            catch (error: any) {
                alert(error.message)
            }
        }
        else {
            alert('Contract not exists or information not complete')
        }

    }

    const onEndvote = async () => {
        if (account === '') {
            alert('You have not connected wallet yet')
            return
        } else if (account !== managerAccount) {
            alert('Only manager can invoke this method.')
            return
        }
        if (!index_end) {
            alert('Please input end index')
            return
        }
        if (sErc20Contract && DAOContract) {
            try {
                await DAOContract.methods.endVote(index_end).send({
                    from: account
                })
                alert('Manager end a proposal')
            }
            catch (error: any) {
                alert(error.message)
            }
        }
        else {
            alert('Contract not exists or information not complete')
        }
    }

    const onClickConnectWallet = async () => {
        // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
        // @ts-ignore
        const { ethereum } = window;
        if (!Boolean(ethereum && ethereum.isMetaMask)) {
            alert('MetaMask is not installed!');
            return
        }

        try {
            // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
            if (ethereum.chainId !== GanacheTestChainId) {
                const chain = {
                    chainId: GanacheTestChainId, // Chain-ID
                    chainName: GanacheTestChainName, // Chain-Name
                    rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
                };

                try {
                    // 尝试切换到本地网络
                    await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chain.chainId }] })
                } catch (switchError: any) {
                    // 如果本地网络没有添加到Metamask中，添加该网络
                    if (switchError.code === 4902) {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain', params: [chain]
                        });
                    }
                }
            }

            // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
            await ethereum.request({ method: 'eth_requestAccounts' });
            // 获取小狐狸拿到的授权用户列表
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            // 如果用户存在，展示其account，否则显示错误信息
            setAccount(accounts[0] || 'Not able to get accounts');
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div>
            <div>
                <h1>Student Society</h1>
                <div>Manager:{managerAccount}</div>
                <div>Manager:{account}</div>
                <div>Max Index:{sum}</div>
                <Button onClick={onClaimgiveToken}>Get Token</Button>
                {account === '' && <Button onClick={onClickConnectWallet}>Connect to wallet</Button>}
            </div>
            {/* <Button onClick={onClaimTable}>Proposal Table</Button> */}
            {/* <Table dataSource={dataSource} columns={columns} /> */}
            <div>
                <div>Input index for information: </div>
                <input onChange={(e) => setindex_ifo(e.target.value)} />
                <div></div>
                <Button onClick={onGetIfo}>Get ifo</Button>
            </div>
            <div>
                <div>Input start time: </div>
                <input onChange={(e) => setstrat_time(e.target.value)} />
            </div>
            <div>
                <div>Input duration: </div>
                <input onChange={(e) => setduration(e.target.value)} />
            </div>
            <div>
                <div>Input name: </div>
                <input onChange={(e) => setPropname(e.target.value)} />
            </div>
            <div>

                <Button onClick={onPromoteProposal}>start proposal</Button>
            </div>

            <div>
                <div>Input vote index: </div>
                <input onChange={(e) => setindex_vote(e.target.value)} />
            </div>
            <div>
                <Button onClick={onVote}>vote</Button>
                <Button onClick={onVoteAgainst}>against</Button>
            </div>

            <div>
                <div>Input end index: </div>
                <input onChange={(e) => setindex_end(e.target.value)} />
            </div>
            <div>

            </div>
            <Button onClick={onEndvote}>end</Button>
        </div>
    )
}
export default StudentSocietyPage    