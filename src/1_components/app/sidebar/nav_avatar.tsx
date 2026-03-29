import { Avatar, AvatarFallback, AvatarImage } from "#src/1_components/ui/avatar.tsx";

interface Props {
	user: { image?: string | undefined; name?: string | undefined; email?: string | undefined };
}

const NavAvatar = ({ user }: Props) => (
	<>
		<Avatar>
			<AvatarImage src={user.image} alt={user.name} />
			<AvatarFallback>TP</AvatarFallback>
		</Avatar>
		<div className="grid flex-1 text-left text-sm/tight">
			<span className="truncate font-medium">{user.name}</span>
			<span className="truncate text-xs">{user.email}</span>
		</div>
	</>
);

export { NavAvatar };
