
import React, { useState, useEffect, useMemo } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { FaExclamationTriangle } from 'react-icons/fa';

interface LocationDisplayProps {
	address: string;
	locationUrl: string;
	coordinates?: { lat: number; lng: number };
	className?: string;
}

// Simple and reliable Google Maps embed URL generator with API key
function getGoogleMapsEmbedUrl(url: string, address: string, apiKey?: string): string {
	console.log('Processing Google Maps URL:', url);
	
	if (!url || !url.trim()) {
		console.log('No URL provided, using address fallback');
		const searchQuery = encodeURIComponent(address);
		const baseUrl = `https://www.google.com/maps/embed/v1/place`;
		return apiKey 
			? `${baseUrl}?key=${apiKey}&q=${searchQuery}&zoom=13`
			: `https://maps.google.com/maps?q=${searchQuery}&z=13&output=embed`;
	}
	
	// Check if this is an iframe embed code and extract the src
	if (url.includes('<iframe') && url.includes('src=')) {
		console.log('Iframe embed code detected, extracting src');
		const srcMatch = url.match(/src=["']([^"']+)["']/);
		if (srcMatch && srcMatch[1]) {
			const extractedSrc = srcMatch[1];
			console.log('Extracted src from iframe:', extractedSrc);
			return extractedSrc;
		}
	}
	
	// Handle iframe embed URLs directly - just return them as-is (preferred format)
	if (url.includes('www.google.com/maps/embed')) {
		console.log('Direct iframe embed URL detected, using as-is');
		return url;
	}
	
	// For maps.app.goo.gl and goo.gl short URLs - these are the most common modern format
	if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
		console.log('Processing short URL:', url);
		if (apiKey) {
			// Use the official Google Maps Embed API with the short URL
			const baseUrl = `https://www.google.com/maps/embed/v1/place`;
			return `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(url)}&zoom=13`;
		} else {
			// Fallback to the old method without API key
			const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(url)}&z=13&output=embed`;
			console.log('Generated embed URL for short link (no API key):', embedUrl);
			return embedUrl;
		}
	}
	
	// Handle regular Google Maps URLs
	if (url.includes('google.com/maps')) {
		// Check for coordinates in the URL
		const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
		if (coordMatch) {
			const [, lat, lng] = coordMatch;
			console.log('Found coordinates:', lat, lng);
			if (apiKey) {
				const baseUrl = `https://www.google.com/maps/embed/v1/view`;
				return `${baseUrl}?key=${apiKey}&center=${lat},${lng}&zoom=15`;
			} else {
				return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
			}
		}
		
		// Check for place information
		const placeMatch = url.match(/\/place\/([^\/\?]+)/);
		if (placeMatch) {
			const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
			console.log('Found place:', place);
			if (apiKey) {
				const baseUrl = `https://www.google.com/maps/embed/v1/place`;
				return `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(place)}&zoom=13`;
			} else {
				return `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=13&output=embed`;
			}
		}
		
		// Use the URL directly as search
		console.log('Using URL as search query');
		if (apiKey) {
			const baseUrl = `https://www.google.com/maps/embed/v1/place`;
			return `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(url)}&zoom=13`;
		} else {
			return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&z=13&output=embed`;
		}
	}
	
	// Fallback: Use address-based search
	const searchQuery = encodeURIComponent(address);
	console.log('Using address fallback:', searchQuery);
	if (apiKey) {
		const baseUrl = `https://www.google.com/maps/embed/v1/place`;
		return `${baseUrl}?key=${apiKey}&q=${searchQuery}&zoom=13`;
	} else {
		return `https://maps.google.com/maps?q=${searchQuery}&z=13&output=embed`;
	}
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ address, locationUrl, className }) => {
	const [mapError, setMapError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
	// Get Google Maps API key from environment variables
	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	
	// Generate embed URL immediately to avoid empty src
	const embedUrl = useMemo(() => {
		if (!locationUrl || !address) {
			console.warn('LocationDisplay: Missing required props', { locationUrl, address });
			return '';
		}
		const url = getGoogleMapsEmbedUrl(locationUrl, address, googleMapsApiKey);
		console.log('LocationDisplay: Generated embed URL:', url);
		console.log('Using API key:', googleMapsApiKey ? 'Yes' : 'No (fallback mode)');
		return url;
	}, [locationUrl, address, googleMapsApiKey]);
	
	useEffect(() => {
		console.log('LocationDisplay initialized with:', { 
			address, 
			locationUrl, 
			embedUrl, 
			hasApiKey: !!googleMapsApiKey 
		});
		
		if (!googleMapsApiKey) {
			console.warn('Google Maps API key not found. Maps may not display properly. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.');
		}
	}, [address, locationUrl, embedUrl, googleMapsApiKey]);
	
	const handleMapLoad = () => {
		console.log('Map loaded successfully');
		setIsLoading(false);
	};
	
	const handleMapError = () => {
		console.warn('Map iframe failed to load');
		setMapError(true);
		setIsLoading(false);
	};

	// Don't render iframe if embedUrl is empty
	if (!embedUrl) {
		return (
			<div className={className || "rounded-xl overflow-hidden border border-gray-200 shadow-lg"}>
				<div className="relative bg-gray-100 h-80 flex items-center justify-center">
					<div className="text-center p-6">
						<MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-600 mb-4">Location information not available</p>
						{!googleMapsApiKey && (
							<div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
								<p className="text-amber-800 text-sm flex items-center gap-2">
									<FaExclamationTriangle className="text-amber-600" />
									Google Maps API key required for proper map display
								</p>
							</div>
						)}
						{locationUrl && (
							<a
								href={locationUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
							>
								View on Google Maps
								<ExternalLink className="w-4 h-4" />
							</a>
						)}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={className || "rounded-xl overflow-hidden border border-gray-200 shadow-lg"}>
			{!mapError ? (
				<div className="relative bg-gray-100">
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
							<div className="flex items-center gap-2 text-gray-500">
								<div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
								<span className="text-sm">Loading map...</span>
							</div>
						</div>
					)}
					{embedUrl && (
						<iframe
							src={embedUrl}
							width="100%"
							height="320"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title={`Map of ${address}`}
							className="w-full h-80"
							onLoad={handleMapLoad}
							onError={handleMapError}
						/>
					)}
				</div>
			) : (
				<div className="relative bg-gray-100 h-80 flex items-center justify-center">
					<div className="text-center p-6">
						<MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-600 mb-4">Unable to load map</p>
						{!googleMapsApiKey && (
							<div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-sm mx-auto">
								<p className="text-amber-800 text-sm flex items-center gap-2">
									<FaExclamationTriangle className="text-amber-600" />
									This may be due to missing Google Maps API key
								</p>
							</div>
						)}
						<a
							href={locationUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
						>
							View on Google Maps
							<ExternalLink className="w-4 h-4" />
						</a>
					</div>
				</div>
			)}
			
			<div className="p-4 text-sm text-gray-700 bg-white border-t border-gray-100">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<MapPin className="w-4 h-4 text-primary-600" />
						<span className="font-medium">{address}</span>
					</div>
					<a
						href={locationUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs font-medium transition-colors"
					>
						Open in Maps
						<ExternalLink className="w-3 h-3" />
					</a>
				</div>
				{!mapError && embedUrl && (
					<div className="mt-2 text-xs text-gray-500">
						Interactive map • Click and drag to explore
					</div>
				)}
			</div>
		</div>
	);
};

export default LocationDisplay;
