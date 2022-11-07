# ZJU-blockchain-course-2022-csc

⬆ 可以️修改成你自己的项目名。

> 第二次作业要求（可以删除）：
> 
> 去中心化学生社团组织治理应用 
> 
> - 每个学生初始可以拥有或领取一些通证积分（ERC20）。 
> - 每个学生可以在应用中可以： 
>    1. 使用一定数量通证积分，发起关于该社团进行活动或制定规则的提案（Proposal）。 
>    2. 提案发起后一定支出时间内，使用一定数量通证积分可以对提案进行投票（赞成或反对，限制投票次数），投票行为被记录到区块链上。 
>    3. 提案投票时间截止后，赞成数大于反对数的提案通过，提案发起者作为贡献者可以领取一定的积分奖励。 
> 
> - (Bonus）发起提案并通过3次的学生，可以领取社团颁发的纪念品（ERC721）

**以下内容为作业仓库的README.md中需要描述的内容。请根据自己的需要进行修改并提交。**

作业提交方式为：提交视频文件和仓库的连接到指定邮箱。

## 如何运行

1. 在本地启动ganache应用。

2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```
3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
    ```
4. 修改`./contracts/hardhat.config.ts`中Ganacha路径和私钥
5. 在 `./contracts` 中部署合约，运行如下的命令：
   ```bash
   npx hardhat run scripts/deploy.ts --network ganache
   ```
6. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm i
    ```
7. 修改`./frontend/src/utils/contract-address.json`中的合约地址
8. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm run start
    ```

## 功能实现分析

### 后端
1. 发布社团积分
    使用_mint()方法铸币，使用映射保证积分无法重复领取
2. 发布提案
    根据前端传递的信息组成proposal结构体，加入proposals映射中，设置isused和valid位方便其他函数检查约束条件，使用transferFrom方法收取一定代币
3. 投票
    设置‘是否已经投票’、‘目标提案是否存在且未结束’等约束条件，然后根据参数对结构体内vote值加或减，使用transferFrom方法收取一定代币
4. 提案结束
    检查‘该index的提案是否有效’等信息后，根据vote是否大于0决定是否给提案发起人转账，然后更改相应变量保证提案结束后系统状态的转移，使用transfer方法奖励一定代币
### 前端
1. 注意设计一些约束条件，比如控制‘Manager only’和‘空输入时无效’等，在执行ransferFrom前使用approve方法


## 项目运行截图

1. 发起提案
    <image src=ptrsc\截图20221108035306.png>
2. 提案发起成功
    <image src=ptrsc\截图20221108035317.png>
3. 投票
    <image src=ptrsc\截图20221108035405.png> 
4. 投票后vote值加一
    <image src=ptrsc\截图20221108035424.png> 
5. 多次投票
    <image src=ptrsc\截图20221108035632.png> 
6. 此时vote为3
    <image src=ptrsc\截图20221108035646.png>    
7. 投反对票
    <image src=ptrsc\截图20221108035804.png> 
8. vote-1为2
    <image src=ptrsc\截图20221108035815.png> 
9.  管理者结束投票
    <image src=ptrsc\截图20221108035844.png> 
10. 该index下的提案无效 
    <image src=ptrsc\截图20221108035855.png> 



## 参考内容

课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。

如果有其它参考的内容，也请在这里陈列。
