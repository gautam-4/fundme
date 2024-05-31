async function main() {
  const FundMe = await ethers.getContractFactory('FundMe');
  console.log('Deploying contract...');
  const fundMe = await FundMe.deploy();
  await fundMe.deployed();
  console.log('Contract deployed to:', fundMe.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });