'use client';
import Image from 'next/image';
import { FC } from 'react';

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

const GlobalError: FC<GlobalErrorProps> = ({ reset }) => (
  <html lang="pt-BR">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
        rel="stylesheet"
      />
    </head>

    <body style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          height: '100vh',
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
              Ops! Parece que algo saiu do esperado
            </p>
            <p style={{ fontSize: '14px' }}>
              Estamos enfrentando um problema técnico que já estamos resolvendo.{' '}
              <br /> Pedimos desculpas pelo transtorno. Tente recarregar a
              página ou acesse novamente em alguns minutos.
            </p>
          </div>

          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#7695EC',
              fontSize: '16px',
              fontWeight: 500,
              color: 'white',
              border: '0 solid transparent',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Recarregar página
          </button>
        </div>
      </div>
    </body>
  </html>
);

export default GlobalError;
