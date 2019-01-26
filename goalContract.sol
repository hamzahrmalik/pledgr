pragma solidity >=0.4.22 <0.6.0;
contract GoalContract
{
    address payable userAddress; // users address, for returning money
    uint64 amount; // amount of currency stored
    string goalDescription; // brief description
    uint64 deadline; // Sort it out to be hours / convert to unix epoch //diff types of goals
    address payable forfeitAddress; // address for money to be sent to on forfeit
    WitnessData[] witnesses; // array of "witnesses"

    struct WitnessData
    {
        address witnessAddress;
        bool voted;
        uint32 vote; // floats?
    }

    /// initialises a contract with { #witnesses, amount of money, description, deadline, forfeit address,
    ///                             {witnessAdresses} }
    constructor (uint32 amountOfWitnesses, uint64 _amount, string memory _goalDescription, uint64 _deadline, address payable _forfeitAddress, address[] memory _witnessAddresses) public {
        userAddress = msg.sender; // set user address to that of current user
        amount = _amount;
        goalDescription = _goalDescription;
        deadline = _deadline;
        forfeitAddress = _forfeitAddress;
        witnesses.length = amountOfWitnesses;

        for (uint i=0; i < amountOfWitnesses; i++)
        {
            witnesses[i] = WitnessData(_witnessAddresses[i], false, 0);
        }
    }

    /// Lets the user vote if they are a witness and havent voted yet.
    function vote(uint32 _vote) public
    {
        bool voted = false;
        bool found = false;
        uint i = 0;

        while (!found && i < witnesses.length)
        {
         if (witnesses[i].witnessAddress == msg.sender)
         {
             found = true;
             voted = witnesses[i].voted;
             break;
         }
         i++;
        }

        // if found and not voted yet, let them vote
        if (found && !voted)
        {
            //vote is 1 or 0 at the minute
            witnesses[i].vote = _vote;
        }
        else
        {
            //not witness or already voted.
        }
    }
}
