'use client';
import Image from 'next/image';
import { FC } from 'react';

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

const GlobalError: FC<GlobalErrorProps> = ({ reset }) => (
  <html lang="pt-BR">
    <body style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          maxHeight: '100svh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: '790px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Image src="/bug.svg" width={240} height={240} alt="Bug image" />

          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                marginBottom: '12px',
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
              Oops! Seems like something&apos;s off
            </p>
            <p style={{ fontSize: '14px' }}>
              We&apos;re facing a technical problem on which we are already
              working. <br /> We apologize for the inconvenience. Try reloading
              the page now or return in a few minutes.
            </p>
          </div>

          <button
            onClick={reset}
            style={{
              padding: '8px 32px',
              backgroundColor: '#7695EC',
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              border: '0 solid transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            RELOAD PAGE
          </button>
        </div>
      </div>
    </body>
  </html>
);

export default GlobalError;
