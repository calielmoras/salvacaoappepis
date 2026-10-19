import { sessao } from '@/data/sessao';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const rotaPublica = pathname === '/' || pathname === '/login';

  useEffect(() => {
    const verificarSessao = async () => {
      await sessao.carregar();
      if (!rotaPublica && !sessao.autenticado) router.replace('/login');
    };

    verificarSessao();
  }, [pathname, rotaPublica, router]);

  if (!rotaPublica && !sessao.autenticado) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </>
  );
}
