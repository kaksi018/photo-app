import { GRAY, PRIMARY } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAP_KEY } from '@/env';
import { forwardRef } from 'react';

type Props = {
  styles?: { container?: object; icon?: object };
  onPress: () => void;
  isLoading?: boolean;
  isSelected?: boolean;
  iconVisible?: boolean;
};

const LocationSearch = forwardRef(
  ({ styles, onPress, isLoading, isSelected, iconVisible }: Props, ref) => {
    return (
      <View style={[defaultStyles.container, styles?.container]}>
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails={true}
          styles={{
            container: { flex: 0 },
            textInput: { paddingLeft: iconVisible ? 30 : 10 },
          }}
          placeholder="위치검색"
          onPress={onPress}
          onFail={(e) => console.log('자동완성실패 : ', e)}
          query={{ key: MAP_KEY, language: 'ko' }}
          debounce={300} //검색주기
          enablePoweredByContainer={false}
          textInputProps={{ editable: !isLoading }}
        />
        {iconVisible && (
          <View style={[defaultStyles.icon, styles?.icon]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
            />
          </View>
        )}
      </View>
    );
  }
);

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconVisible: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.LIGHT,
  },
  icon: {
    position: 'absolute',
    left: 25,
    top: 13,
  },
});

export default LocationSearch;
