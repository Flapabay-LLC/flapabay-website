import React, { useEffect, useState } from 'react';
import { Listing } from '@/types/listing';
import { ListingsService } from '@/services/listingsService';
import { motion } from 'framer-motion';
import * as IconsaxIcons from 'iconsax-react';
import { Heart, Star } from 'iconsax-react';
import { useAuth } from '@/hooks/useAuth';
import { Alert } from 'bootstrap';

interface ListingCardProps {
  listing: Listing;
  onFavoriteToggle?: (listingId: number) => Promise<void>;
}

// Dynamic icon component that can render any Iconsax icon
const DynamicIcon: React.FC<{ iconName: string; variant?: 'Outline' | 'Bold'; className?: string }> = ({ 
  iconName, 
  variant = 'Outline',
  className = ''
}) => {
  // Convert icon name to PascalCase (e.g., 'house3' -> 'House3')
  const pascalCaseName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  
  // Get the icon component from IconsaxIcons
  const IconComponent = (IconsaxIcons as any)[pascalCaseName] || IconsaxIcons.Building;
  
  return <IconComponent variant={variant} className={className} />;
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, onFavoriteToggle }) => {
  const { isAuthenticated } = useAuth();
  const formattedPrice = ListingsService.formatPrice(listing.price, listing.currency);
  const [isFavorite, setIsFavorite] = React.useState(listing.is_favorite);
  const [isToggling, setIsToggling] = React.useState(false);
  const [currentIcon, setCurrentIcon] = useState<string>('Building');

  useEffect(() => {
    const updateIcon = async () => {
      try {
        if (listing.property_type?.black_icon) {
          // alert('YH')
          setCurrentIcon(listing.property_type.black_icon);
        }
      } catch (error) {
      //  alert('YHjkkkkkkkk')
        console.error('Error loading icon:', error);
        setCurrentIcon('Building');
      }
    };

    updateIcon();
  }, [listing.property_type?.black_icon]);

  // isFeatured is currently a dummy value. In a real application, this would come from `listing.featured` from the API.
  const isFeatured = listing.id % 2 === 0; 
  // likesCount is currently a placeholder. In a real application, this would come from `listing.likes_count` from the API.
  const likesCount = 42; 

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // alert('You must be logged in to favorite listings'); // Or show a toast
      return;
    }

    if (isToggling) return;

    try {
      setIsToggling(true);
      if (onFavoriteToggle) {
        await onFavoriteToggle(listing.id);
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="listing-card bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
    >
      {/* Image Section */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
        {listing.images[0] ? (
          <img
            src={listing.images[0].url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 ${ 
            isAuthenticated ? 'hover:opacity-70' : 'cursor-not-allowed opacity-50'
          }`}
          disabled={!isAuthenticated || isToggling}
        >
          <Heart
            variant={isFavorite ? "Bold" : "Outline"}
            className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{listing.title}</h3>
        
        <p className="text-md font-semibold mb-3" style={{ color: '#FF5A5F' }}>{formattedPrice} <span className="font-normal">/ night</span></p>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Star variant="Bold" className="text-yellow-400 w-3 h-3" />
            <span>{listing.rating} ({listing.reviews.length})</span>
          </div>
          <div className="flex items-center space-x-1">
            <DynamicIcon 
              iconName={currentIcon}
              variant="Outline" 
              className="text-gray-500 w-3 h-3" 
            />
            <span>{listing.property_type?.name || 'Property'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart variant="Bold" className="text-red-500 w-3 h-3" />
            <span>{likesCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard; 