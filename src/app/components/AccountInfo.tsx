import { useState } from 'react';
import { Check, ChevronLeft, Copy, ExternalLink, QrCode, Wallet, X } from 'lucide-react';

interface Account {
  bank: string;
  accountNumber: string;
  holder: string;
  kakaoPayUrl: string;
  tossUrl: string;
  tossQrSrc: string;
}

const accounts: { groom: Account; bride: Account } = {
  groom: {
    bank: '국민은행',
    accountNumber: '579302-04-033281',
    holder: '우준형',
    kakaoPayUrl: 'https://qr.kakaopay.com/Ej8eZdjRa',
    tossUrl:
      'supertoss://send?amount=0&bank=KB%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89&accountNo=57930204033281&origin=qr',
    tossQrSrc: '/payment/groom-toss-qr.png',
  },
  bride: {
    bank: '농협',
    accountNumber: '302-0174-7317-61',
    holder: '송희진',
    kakaoPayUrl: 'https://qr.kakaopay.com/Ej7mp5r2D',
    tossUrl:
      'supertoss://send?amount=0&bank=NH%EB%86%8D%ED%98%91%EC%9D%80%ED%96%89&accountNo=3020174731761&origin=qr',
    tossQrSrc: '/payment/bride-toss-qr.png',
  },
};

type AccountSide = keyof typeof accounts;
type DetailView = 'menu' | 'account' | 'tossQr';

function getSideTitle(side: AccountSide) {
  return side === 'groom' ? '신랑측' : '신부측';
}

function AccountDetails({ account }: { account: Account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSide, setSelectedSide] = useState<AccountSide | null>(null);
  const [detailView, setDetailView] = useState<DetailView>('menu');

  const selectedAccount = selectedSide ? accounts[selectedSide] : null;

  const openSide = (side: AccountSide) => {
    setSelectedSide(side);
    setDetailView('menu');
  };

  const closePanel = () => {
    setIsOpen(false);
    setSelectedSide(null);
    setDetailView('menu');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white shadow-sm transition-colors hover:bg-neutral-800"
        >
          <span className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            축의금 전하기
          </span>
        </button>
      ) : (
        <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">마음 전하실 곳</p>
              <h3 className="text-lg text-neutral-900">
                {selectedSide ? `${getSideTitle(selectedSide)} 선택` : '전하실 곳을 선택해 주세요'}
              </h3>
            </div>
            <button
              type="button"
              onClick={closePanel}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500"
              aria-label="축의금 패널 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!selectedSide && (
            <div className="grid grid-cols-2 gap-3">
              {(['groom', 'bride'] as AccountSide[]).map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => openSide(side)}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-5 text-center transition-colors hover:border-rose-200 hover:bg-rose-50"
                >
                  <span className="block text-sm text-neutral-500">{getSideTitle(side)}</span>
                  <span className="mt-1 block font-medium text-neutral-900">{accounts[side].holder}</span>
                </button>
              ))}
            </div>
          )}

          {selectedSide && selectedAccount && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedSide(null);
                  setDetailView('menu');
                }}
                className="mb-1 flex items-center gap-1 text-sm text-neutral-500"
              >
                <ChevronLeft className="h-4 w-4" />
                신랑측/신부측 다시 선택
              </button>

              {detailView === 'menu' && (
                <div className="grid gap-3">
                  <a
                    href={selectedAccount.kakaoPayUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl bg-[#fee500] px-4 py-3 text-sm font-medium text-neutral-900"
                  >
                    카카오페이로 보내기
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={selectedAccount.tossUrl}
                    className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700"
                  >
                    토스로 보내기
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setDetailView('account')}
                    className="flex items-center justify-between rounded-xl bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-800"
                  >
                    계좌번호 보기
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailView('tossQr')}
                    className="flex items-center justify-between rounded-xl border border-blue-100 px-4 py-3 text-sm font-medium text-blue-600"
                  >
                    토스 QR로 보기
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              )}

              {detailView === 'account' && (
                <div className="space-y-3">
                  <AccountDetails account={selectedAccount} />
                  <button
                    type="button"
                    onClick={() => setDetailView('menu')}
                    className="w-full rounded-xl border border-neutral-200 py-3 text-sm text-neutral-600"
                  >
                    다른 방법 보기
                  </button>
                </div>
              )}

              {detailView === 'tossQr' && (
                <div className="space-y-3 text-center">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <img
                      src={selectedAccount.tossQrSrc}
                      alt={`${getSideTitle(selectedSide)} 토스 송금 QR`}
                      className="mx-auto w-full max-w-64 rounded-lg bg-white"
                    />
                    <p className="mt-3 text-xs text-neutral-500">
                      토스 앱에서 QR을 인식해 송금할 수 있습니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDetailView('menu')}
                    className="w-full rounded-xl border border-neutral-200 py-3 text-sm text-neutral-600"
                  >
                    다른 방법 보기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
