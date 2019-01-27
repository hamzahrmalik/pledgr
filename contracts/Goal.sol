pragma solidity ^0.4.24;
contract Goal
{
    address userAddress; // users address, for returning money
    uint64 amount; // amount of currency stored
    string goalDescription; // brief description
    uint32 deadline; // Sort it out to be hours / convert to unix epoch //diff types of goals
    address forfeitAddress; // address for money to be sent to on forfeit

    WitnessData[] witnesses; // array of "witnesses"

    /* If all witnesses voted, this would give the number of voters necessary; used to calculate proportion of
		(i) total number of judges who voted True for early condition, or
		(ii) voting judges who voted True for deadline condition */
	uint8 minWitnessesIfAllVote;

    struct WitnessData
    {
        address witnessAddress;
        bool voted;
        uint32 vote; // floats?
    }

    /// initialises a contract with { #witnesses, amount of money, description, deadline, forfeit address,
    ///                             {witnessAdresses} }
    constructor (uint32 amountOfWitnesses, uint64 _amount, string memory _goalDescription, uint32 _deadline, address _forfeitAddress, address[] memory _witnessAddresses) public {
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

    /// Lets the user vote if they are a witness and haven't voted yet.
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

    function returnToUser() public payable {
        userAddress.transfer(amount);
    }

    function forfeit() public payable {
        forfeitAddress.transfer(amount);
    }

    // Stuff I'm playing with
    function countTrueVotes() public view returns(uint) { // Counts total number of judges that voted True (i.e. 1)
        uint count = 0;
    	for (uint i=0; i < witnesses.length ; i++){
    		if (witnesses[i].voted == true && witnesses[i].vote == 1) {
    			count++;
    		}
    	}
    return count;
    }

	function countTotalVotes() public view returns(uint){ // Counts total number of judges that voted (either way)
	    uint count = 0;
		for (uint i=0; i < witnesses.length; i++){
			if (witnesses[i].voted == true){
				count++;
			}
		}
	return count;
	}

	function earlyCondition() public { // Checks if there are already enough positive votes to trigger return of money
		if (((1000*countTrueVotes()) / witnesses.length) >= ((1000*minWitnessesIfAllVote) / witnesses.length)) {
			returnToUser();
			/* I don't know if I'm accessing these variables correctly, or if the division or comparison will work.
			(From what I can understand, floats can be evaluated but not assigned to variables.)
			The idea is to return the money if the proportion of total witnesses who have voted True (i.e. 1) meets or exceeds the proportion.
			This function could be called each time a witness votes. */
		}
	}

	/// Implement checking of the function!!
	function deadlineCondition() public {
		if (deadline <= now) { // pseudo-code; this is the function that should be called at the deadline.
			if (((1000*countTrueVotes() / countTotalVotes()) >= (1000*minWitnessesIfAllVote / witnesses.length)) && (countTotalVotes() > 0)){
				returnToUser();
			} else {
				forfeit();
			}
		}
    }
}
