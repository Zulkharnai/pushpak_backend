const { Model } = require('objection');

class AccountsVoucher extends Model {
    static get tableName() {
        return 'accounts__vouchers';
    };
    static get idColumn() {
        return 'voucher_id';
    };

    // Traffic Dashboard 
    static async GetATM(vehicle_id, start, limit, keyword, from_date, to_date) {

        let query = AccountsVoucher.query()
            .select('accounts__vouchers.*',
                'accounts__transactions.vehicle_id',
                'accounts__transactions.remark',
                'accounts__ledgers.ledger_title',
                'users.user_name')
            .leftJoin('accounts__ledgers', 'accounts__ledgers.ledger_id', 'accounts__vouchers.ledger_id')
            .leftJoin('accounts__transactions', 'accounts__transactions.voucher_id', 'accounts__vouchers.voucher_id')
            .leftJoin('users', 'users.user_id', 'accounts__vouchers.entry_by')
            .where('accounts__vouchers.voucher_type', 'ATM')
            .where('accounts__transactions.vehicle_id', vehicle_id)
            .page(start, limit);

        if (keyword) {
            query = query.where('accounts__ledgers.ledger_title', 'LIKE', `%${keyword}%`)
        }

        if (from_date && to_date) {
            query = query.whereBetween('entry_date', [from_date, to_date]);
        }

        query = query.orderBy('accounts__vouchers.voucher_id', 'desc')

        const response = await query
        return response;
    }

    //Traffic Dashboard
    static async GetBPCL(vehicle_id, start, limit, keyword, from_date, to_date) {

        let query = AccountsVoucher.query()
            .select('accounts__vouchers.*',
                'accounts__transactions.vehicle_id',
                'accounts__transactions.remark',
                'accounts__ledgers.ledger_title',
                'users.user_name')
            .leftJoin('accounts__ledgers', 'accounts__ledgers.ledger_id', 'accounts__vouchers.ledger_id')
            .leftJoin('accounts__transactions', 'accounts__transactions.voucher_id', 'accounts__vouchers.voucher_id')
            .leftJoin('users', 'users.user_id', 'accounts__vouchers.entry_by')
            .where('accounts__vouchers.voucher_type', 'BPCL')
            .where('accounts__transactions.vehicle_id', vehicle_id)
            .page(start, limit);

        if (keyword) {
            query = query.where('accounts__ledgers.ledger_title', 'LIKE', `%${keyword}%`)
        }

        if (from_date && to_date) {
            query = query.whereBetween('entry_date', [from_date, to_date]);
        }

        query = query.orderBy('accounts__vouchers.voucher_id', 'desc')

        const response = await query
        return response;
    }

    //Traffic Dashboard
    static async GetCash(vehicle_id, start, limit, keyword, from_date, to_date) {

        let query = AccountsVoucher.query()
            .select('accounts__vouchers.*',
                'accounts__transactions.vehicle_id',
                'accounts__transactions.remark',
                'accounts__ledgers.ledger_title',
                'users.user_name')
            .leftJoin('accounts__ledgers', 'accounts__ledgers.ledger_id', 'accounts__vouchers.ledger_id')
            .leftJoin('accounts__transactions', 'accounts__transactions.voucher_id', 'accounts__vouchers.voucher_id')
            .leftJoin('users', 'users.user_id', 'accounts__vouchers.entry_by')
            .where('accounts__vouchers.voucher_type', 'Cash')
            .where('accounts__transactions.vehicle_id', vehicle_id)
            .page(start, limit);

        if (keyword) {
            query = query.where('accounts__ledgers.ledger_title', 'LIKE', `%${keyword}%`)
        }

        if (from_date && to_date) {
            query = query.whereBetween('entry_date', [from_date, to_date]);
        }

        query = query.orderBy('accounts__vouchers.voucher_id', 'desc')

        const response = await query
        return response;
    }
};

module.exports = AccountsVoucher;