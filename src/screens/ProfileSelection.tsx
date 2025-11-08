import React from 'react';
import { Profile, ProfileId } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { CoinDisplay } from '../components/CoinDisplay';

interface ProfileSelectionProps {
  profiles: { daughter: Profile; son: Profile };
  onSelectProfile: (profileId: ProfileId) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  profiles,
  onSelectProfile,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-shadow">
            🚀 WordRush
          </h1>
          <p className="text-2xl text-textSecondary">
            Who's ready to learn today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Daughter Profile */}
          <Card hoverable>
            <div className="text-center space-y-6">
              <Avatar unlockedItems={profiles.daughter.unlockedItems} size="lg" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {profiles.daughter.name}
                </h2>
                <p className="text-xl text-textSecondary mb-4">
                  Age {profiles.daughter.age}
                </p>
                <CoinDisplay coins={profiles.daughter.coins} size="lg" />
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => onSelectProfile('daughter')}
              >
                ✨ Select Profile
              </Button>
            </div>
          </Card>

          {/* Son Profile */}
          <Card hoverable>
            <div className="text-center space-y-6">
              <Avatar unlockedItems={profiles.son.unlockedItems} size="lg" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {profiles.son.name}
                </h2>
                <p className="text-xl text-textSecondary mb-4">
                  Age {profiles.son.age}
                </p>
                <CoinDisplay coins={profiles.son.coins} size="lg" />
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => onSelectProfile('son')}
              >
                ✨ Select Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
