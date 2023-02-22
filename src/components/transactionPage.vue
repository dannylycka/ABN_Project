<script setup lang="ts">
import type {
  account,
  accountInformation,
  transactionInformation,
  transactions,
} from "@/data/types";
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-if="currentAccount.groupId != '' && transactions.length == 0"
      class="grid grid-rows-3 grid-flow-col gap-4 bg-stone-700 p-6 rounded-md"
    >
      <div class="">Account type: {{ currentAccount.groupId }}</div>
      <div
        @click="getTransactions(accounts.accountNumber)"
        class="border-solid border-2 border-sky-500 p-6 cursor-pointer"
        v-for="accounts in currentAccountInformation"
        :key="accounts.accountNumber"
      >
        <div>Name: {{ accounts.holderName }}</div>
        <div>
          {{ accounts.accountNumberType }}: {{ accounts.accountNumber }}
        </div>
        <div>
          Balance: {{ accounts.balance }}
          {{ accounts.currencyCode.toLocaleLowerCase() }}
        </div>
      </div>
    </div>
    <div
      v-if="savingsAccount.groupId != '' && transactions.length == 0"
      class="grid grid-rows-3 grid-flow-col gap-4 bg-stone-700 p-6 rounded-md"
    >
      <div class="">Account type: {{ savingsAccount.groupId }}</div>
      <div
        @click="getTransactions(accounts.accountNumber)"
        class="border-solid border-2 border-sky-500 p-6 cursor-pointer"
        v-for="accounts in savingsAccountInformation"
        :key="accounts.accountNumber"
      >
        <div>Name: {{ accounts.holderName }}</div>
        <div>
          {{ accounts.accountNumberType }}: {{ accounts.accountNumber }}
        </div>
        <div>
          Balance: {{ accounts.balance }}
          {{ accounts.currencyCode.toLocaleLowerCase() }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="transactions.length > 0">
    <div
      @click="transactions = []"
      class="p-2 bg-stone-600 inline-flex rounded-lg text-white cursor-pointer"
    >
      &lt;- Home
    </div>
    <div
      @click="sortTransactions()"
      class="p-2 ml-6 bg-stone-600 inline-flex rounded-lg text-white cursor-pointer"
    >
      Sort by transaction date
    </div>
    <div class="">
      Account number: {{ transactionInformation.accountNumber }}
    </div>
    <div
      class="grid grid-cols-12 grid-rows-2 gap-4 bg-stone-700 p-6 rounded-md"
    >
      <div
        class="col-span-4 border-solid border-2 border-sky-500 p-6"
        v-for="transaction in transactions"
        :key="transaction.transactionId"
      >
        <div>Description: {{ transaction.description }}</div>
        <div>
          Amount: {{ transaction.amount }}
          {{ transactionInformation.currencyCode.toLocaleLowerCase() }}
        </div>
        <div>
          Date:
          {{ new Date(transaction.bookDate).toLocaleString("nl-NL") }}
        </div>
        <div>
          Transaction date:
          {{
            new Date(transaction.transactionDateTime).toLocaleString("nl-NL")
          }}
        </div>
        <div>To: {{ transaction.counterpartyName }}</div>
        <div>At: {{ transaction.counterpartyAccountNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentAccount: [] as unknown as account,
      currentAccountInformation: [] as unknown as accountInformation[],
      savingsAccount: [] as unknown as account,
      savingsAccountInformation: [] as unknown as accountInformation[],
      transactions: [] as unknown as transactions[],
      transactionInformation: [] as unknown as transactionInformation,
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      try {
        fetch("./src/data/Accounts.json")
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              console.log(res);
              throw "couldn't get data";
            }
          })
          .then((data) => {
            for (let typesOfAccounts of data.accountGroups) {
              this.getCurrentAccount(typesOfAccounts, typesOfAccounts.groupId);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    getCurrentAccount(accountType: account, type: string) {
      if (accountType.groupId == type) {
        if (type == "current") {
          this.currentAccount = accountType;
          for (let accounts of accountType.accounts) {
            let typedAccounts: accountInformation = accounts;
            this.currentAccountInformation.push(typedAccounts);
          }
        } else {
          this.savingsAccount = accountType;
          for (let accounts of accountType.accounts) {
            let typedAccounts: accountInformation = accounts;
            this.savingsAccountInformation.push(typedAccounts);
          }
        }
      }
    },
    getTransactions(accountNumber: string) {
      let filename;
      if (accountNumber.endsWith("276")) {
        filename = "TransactionsB";
      } else if (accountNumber.endsWith("838")) {
        filename = "TransactionsC";
      } else {
        filename = "TransactionsD";
      }
      try {
        fetch(`./src/data/${filename}.json`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              console.log(res);
              throw "couldn't get data";
            }
          })
          .then((data) => {
            for (let transactions of data.transactions) {
              this.transactions.push(transactions);
            }
            this.transactionInformation = data.account;
          });
      } catch (error) {
        console.log(error);
      }
    },
    sortTransactions() {
      console.log(this.transactions);
      this.transactions.sort((a, b) => {
        const dateTimeA = a.transactionDateTime;
        const dateTimeB = b.transactionDateTime;

        if (!dateTimeA) return 1;
        if (!dateTimeB) return -1;

        return dateTimeA > dateTimeB ? -1 : 1;
      });
      console.log(this.transactions);
      return this.transactions;
    },
  },
};
</script>
