import { InfoBlock } from '@/components/shared/';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <InfoBlock
        title="доступ запрещён 🚫"
        text="данную страницу могут просматривать только авторизованные пользователи 🕵️‍♂️"
        imageUrl="/padlock.png"
      />
    </div>
  );
}
