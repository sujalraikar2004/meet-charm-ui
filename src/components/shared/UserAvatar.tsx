import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

export function UserAvatar({ 
  src, 
  name, 
  size = 'md', 
  showRing = true,
  className 
}: UserAvatarProps) {
  const avatarSrc = src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <img
      src={avatarSrc}
      alt={name}
      className={cn(
        'rounded-full object-cover',
        sizeClasses[size],
        showRing && 'ring-2 ring-primary/20',
        className
      )}
    />
  );
}

interface AvatarGroupProps {
  users: Array<{ name: string; avatar?: string }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, idx) => (
        <UserAvatar
          key={idx}
          src={user.avatar}
          name={user.name}
          size={size}
          className="ring-2 ring-card"
        />
      ))}
      {remainingCount > 0 && (
        <div className={cn(
          'rounded-full bg-secondary flex items-center justify-center font-medium ring-2 ring-card',
          sizeClasses[size],
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
