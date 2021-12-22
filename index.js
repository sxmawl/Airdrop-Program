const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");


//const newPair = new Keypair();
const tempWallet = Keypair.fromSecretKey( Uint8Array.from([
    12, 128,  21,  20,  13, 233,  87, 241, 187, 253,  22,
    98, 147,  44, 252, 178, 212,  86,  79,   0, 147, 186,
    63, 142,  39,   9,  67,  35, 168,  68,  29, 222, 246,
     2,  11,  24,  56, 232, 144, 215,  25, 153,  14,  14,
    65,  64, 242,  45, 105, 148, 223, 251, 168,  78, 121,
   221, 161, 248, 250,  46,  45,  89,  88, 244
 ]));
const publicKey = tempWallet.publicKey;
const secretKey = tempWallet.secretKey;




const getBalance = async () => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        )

        console.log(`=> For wallet address ${publicKey}`);
        console.log(` Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    }catch(err){

    }
}

const airDropSol = async () =>{
    
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = Keypair.fromSecretKey(secretKey);
        console.log(secretKey);
        console.log(`-- Airdropping 2 SOL --`);
        const fromAirDropSignature  = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey),
            2 * LAMPORTS_PER_SOL
        )
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log(err);
    }
}

const driverFunction = async () =>{
    await getBalance();
    await airDropSol();
    await getBalance();
}

driverFunction();