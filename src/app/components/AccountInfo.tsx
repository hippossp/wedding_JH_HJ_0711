import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Account {
  bank: string;
  accountNumber: string;
  holder: string;
}

const accounts: { groom: Account; bride: Account } = {
  groom: {
    bank: '국민은행',
    accountNumber: '123-456-789012',
    holder: '김민수',
  },
  bride: {
    bank: '신한은행',
    accountNumber: '987-654-321098',
    holder: '이지은',
  },
};

function AccountCard({ title, account }: { title: string; account: Account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-neutral-200">
      <h4 className="text-sm text-neutral-500 mb-3">{title}</h4>
      <div className="space-y-2">
        <p className="font-medium">{account.holder}</p>
        <p className="text-neutral-600">{account.bank}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-neutral-800">{account.accountNumber}</p>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="계좌번호 복사"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-neutral-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AccountInfo() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        <AccountCard title="신랑측 계좌" account={accounts.groom} />
        <AccountCard title="신부측 계좌" account={accounts.bride} />
      </div>
    </div>
  );
}
