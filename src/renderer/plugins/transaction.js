// eslint-disable-next-line import/prefer-default-export
export class Transaction {
  constructor(tx) {
    this.blockId = tx.blockId;
    this.hash = tx.hash;
    this.type = tx.type;
    this.timestamp = tx.timestamp;
    this.status = tx.status;
    this.from = tx.from;
    this.to = tx.to;
    this.fee = tx.fee;
    this.nonce = tx.nonce;
    this.message = tx.message;
    this.reason = tx.data.log;
    this.info_substr = '';
    this.info_amount = null;
    this.info_coin = '';

    switch (this.type) {
      case 'send_coin':
        this.amount = tx.data.amount;
        this.coin = Transaction.fmtCoin(tx.data.coin);
        this.info_substr = `${this.amount} ${this.coin}`;
        this.info_amount = this.amount;
        this.info_coin = this.coin;
        break;
      case 'multi_send_coin':
        this.multisend_receivers = tx.data.multisend_receivers;
        break;
      case 'sell_coin':
        this.sell_amount = tx.data.amount_to_sell;
        this.sell_coin = Transaction.fmtCoin(tx.data.coin_to_sell);
        this.get_amount = this.status === 'Success' ? tx.data.amount_base : '';
        this.max_amount_to_buy = this.status === 'Fail' ? tx.data.max_amount_to_buy : '';
        this.get_coin = Transaction.fmtCoin(tx.data.coin_base);
        this.info_amount = this.sell_amount;
        this.info_coin = this.sell_coin;
        break;
      case 'sell_all_coin':
        this.sell_amount = tx.data.amount_to_sell;
        this.sell_coin = Transaction.fmtCoin(tx.data.coin_to_sell);
        this.get_amount = tx.data.amount_base;
        this.get_coin = Transaction.fmtCoin(tx.data.coin_base);
        this.info_amount = this.sell_amount;
        this.info_coin = this.sell_coin;
        break;
      case 'buy_coin':
        this.buy_amount = tx.data.amount_to_buy;
        this.buy_coin = Transaction.fmtCoin(tx.data.coin_to_buy);
        this.spend_amount = this.status === 'Success' ? tx.data.amount_base : '';
        this.max_amount_to_sell = this.status === 'Fail' ? tx.data.max_amount_to_sell : '';
        this.spend_coin = Transaction.fmtCoin(tx.data.coin_base);
        this.info_substr = `${this.buy_amount} ${this.buy_coin}`;
        this.info_amount = this.buy_amount;
        this.info_coin = this.buy_coin;
        break;
      case 'create_coin':
        this.coin = Transaction.fmtCoin(tx.data.symbol);
        this.symbol = Transaction.fmtCoin(tx.data.symbol);
        this.coin_title = tx.data.title;
        this.crr = tx.data.constant_reserve_ratio;
        this.initial_volume = tx.data.initial_volume;
        this.initial_reserve = tx.data.initial_reserve;
        this.limit_volume = tx.data.limit_volume;
        this.info_substr = `${this.symbol}`;
        this.info_amount = this.initial_volume;
        this.info_coin = this.symbol;
        break;
      case 'create_wallet':
        this.multisig = tx.data.wallet;
        this.owners = tx.data.owners;
        this.weights = tx.data.weights;
        this.threshold = tx.data.threshold;
        break;
      case 'create_transaction':
        this.multisig = tx.data.wallet;
        this.confirmed = tx.data.confirmed;
        this.confirmations = tx.data.confirmations;
        this.signer_weight = tx.data.signer_weight;
        this.transaction = tx.data.transaction;
        this.info_amount = JSON.parse(tx.data.coins)[0].amount;
        this.info_coin = Transaction.fmtCoin(JSON.parse(tx.data.coins)[0].coin);
        this.amount = this.info_amount;
        this.coin = this.info_coin;
        break;
      case 'sign_transaction':
        this.multisig = tx.data.wallet;
        this.confirmed = tx.data.confirmed;
        this.confirmations = tx.data.confirmations;
        this.signer_weight = tx.data.signer_weight;
        this.transaction = tx.data.transaction;
        this.info_amount = tx.data.amount;
        this.info_coin = Transaction.fmtCoin(tx.data.coin);
        break;
      case 'declare_candidate':
        this.amount = tx.data.amount;
        this.coin = Transaction.fmtCoin(tx.data.coin);
        this.commission = tx.data.commission * 100;
        this.reward_address = tx.data.reward_address;
        this.validator_address = tx.data.validator_address;
        this.validator_moniker = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.moniker : '';
        this.validator_website = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.website : '';
        this.validator_identity = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.identity : '';
        this.validator_security_contact = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.security_contact : '';
        this.validator_details = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.details : '';
        break;
      case 'edit_candidate':
        this.reward_address = tx.data.reward_address;
        this.validator_address = tx.data.validator_address;
        this.validator_moniker = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.moniker : '';
        this.validator_website = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.website : '';
        this.validator_identity = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.identity : '';
        this.validator_security_contact = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.security_contact : '';
        this.validator_details = typeof tx.data.validator_desc !== 'undefined' ? tx.data.validator_desc.details : '';
        break;
      case 'delegate':
        this.amount = tx.data.amount;
        this.coin = Transaction.fmtCoin(tx.data.coin);
        this.validator_address = tx.data.validator_address;
        this.info_amount = this.amount;
        this.info_coin = this.coin;
        break;
      case 'unbond':
        this.amount = tx.data.amount;
        this.coin = Transaction.fmtCoin(tx.data.coin);
        this.validator_address = tx.data.validator_address;
        this.completion_time = tx.data.completion_time;
        this.info_substr = this.amount;
        this.amount = this.info_substr;
        this.info_amount = this.amount;
        this.info_coin = this.coin;
        break;
      case 'set_online':
        this.validator_address = tx.data.validator_address;
        break;
      case 'set_offline':
        this.validator_address = tx.data.validator_address;
        break;
      case 'redeem_check':
        this.receiver = tx.from;
        this.check = tx.data.check;
        this.proof = tx.data.proof;
        if (this.status === 'Success') {
          this.issuer = tx.data.issuer;
          this.due_block = tx.data.due_block;
          this.coin_check = Transaction.fmtCoin(tx.data.coin_check);
          this.amount_check = tx.data.amount_check;
          this.info_amount = this.amount_check;
          this.info_coin = this.coin_check;
        }
        break;
      case 'htlt':
        if (this.type === 'Success') {
          this.info_amount = JSON.parse(tx.data.atomic_swap.amount)[0].amount;
          this.info_coin = Transaction.fmtCoin(JSON.parse(tx.data.atomic_swap.amount)[0].coin);
        }
        this.from = tx.data.atomic_swap.from;
        this.time_locked = tx.data.atomic_swap.time_locked;
        this.transfer_type = tx.data.atomic_swap.transfer_type;
        break;
      case 'redeem':
        this.from = tx.data.atomic_swap.from;
        this.hashed_secret = tx.data.atomic_swap.hashed_secret;
        this.secret = tx.data.atomic_swap.secret;
        break;
      case 'refund':
        this.from = tx.data.atomic_swap.from;
        this.hashed_secret = tx.data.atomic_swap.hashed_secret;
        break;
      case 'vote':
        this.proposal = tx.data.submit_proposal.proposal_id;
        this.vote = tx.data.submit_proposal.vote;
        break;
      case 'submit_proposal':
        this.proposal = tx.data.submit_proposal.proposal_id;
        this.proposal_title = tx.data.submit_proposal.title;
        this.description = tx.data.submit_proposal.description;
        this.validator_address = tx.data.submit_proposal.proposer;
        this.voting_start = tx.data.submit_proposal.voting_start_block;
        this.voting_end = tx.data.submit_proposal.voting_end_block;
        break;
      default:
        break;
    }
  }

  static fmtCoin(_coin) {
    let coin = _coin.toUpperCase();
    if (coin === 'TDEL') {
      coin = 'tDEL';
    }
    return coin;
  }
}
