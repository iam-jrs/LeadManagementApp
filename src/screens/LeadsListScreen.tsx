
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import leadsData from '../mock/data.json';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { K } from '../constants/AppConstants';
import { SafeAreaView } from 'react-native-safe-area-context';

// Number of leads to load per page
const PAGE_SIZE = 20;

// Helper to get status label from value
const getStatusLabel = (statuses: any[], value: string) => {
  const found = statuses.find((s) => s.value === value);
  return found ? found.label : value;
};

// Main LeadsListScreen component: displays, filters, sorts, and paginates leads
const LeadsListScreen = ({ navigation }: any) => {
  // Search/filter/sort/pagination state
  const [search, setSearch] = useState('');
  const { theme } = useContext(ThemeContext);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedLeads, setDisplayedLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // All leads from Redux store
  const allLeads = useSelector((state: RootState) => state.lead.leads);
  // Status options from mock data
  const statuses = leadsData.statuses;

  // Filtering, searching, sorting logic for leads
  const getFilteredLeads = useCallback(() => {
    let leads = [...allLeads];
    if (search) {
      const search_text = search.toLowerCase();
      leads = leads.filter(
        (lead) =>
          lead.client.name.toLowerCase().includes(search_text) ||
          lead.client.mobile_number.includes(search_text)
      );
    }
    if (statusFilter) {
      leads = leads.filter((lead) => lead.status === statusFilter);
    }
    leads.sort((a, b) => {
      const d1 = new Date(a.created_at).getTime();
      const d2 = new Date(b.created_at).getTime();
      return sortAsc ? d1 - d2 : d2 - d1;
    });
    return leads;
  }, [allLeads, search, statusFilter, sortAsc]);

  // Pagination: update displayedLeads when filters/page change
  useEffect(() => {
    const leads = getFilteredLeads();
    setDisplayedLeads(leads.slice(0, page * PAGE_SIZE));
  }, [getFilteredLeads, page]);

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setRefreshing(false);
    }, 800);
  };

  // Infinite scroll handler for pagination
  const onEndReached = () => {
    if (displayedLeads.length < getFilteredLeads().length) {
      setLoading(true);
      setTimeout(() => {
        setPage((p) => p + 1);
        setLoading(false);
      }, 500);
    }
  };

  // Render a single lead card
  const renderLead = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
      onPress={() => navigation.navigate('LeadDetail', { leadId: item.id })}
    >
      <Text style={[styles.cardId, { color: theme.text }]}>ID: {item.id}</Text>
      <Text style={[styles.cardName, { color: theme.text }]}>Client: {item.client.name}</Text>
      <Text style={[styles.cardProject, { color: theme.subText }]}>Project: {item.project.name}</Text>
      <Text style={[styles.cardStatus, { color: theme.primary }]}>Status: {getStatusLabel(statuses, item.status)}</Text>
      <Text style={[styles.cardDate, { color: theme.muted }]}>Created: {new Date(item.created_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  // Render leads list UI: search, filter, sort, and paginated list
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background }}
      edges={['bottom']}
    >
      {/* Status bar and floating add button */}
      <StatusBar backgroundColor={theme.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CustomButton
          onPress={() => navigation.navigate('AddLead')}
          title="+ Add Lead"
          style={{
            padding: 10,
            position: 'absolute',
            right: 10,
            bottom: 50,
            zIndex: 1,
            backgroundColor: theme.primary,
          }}
        />
        {/* Search input */}
        <View style={styles.headerRow}>
          <CustomTextInput
            style={styles.searchInput}
            hintText={'Search by name or mobile'}
            inputValue={search}
            onInputTextChange={setSearch}
          />
        </View>

        {/* Filter and sort row */}
        <View style={styles.filterRow}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'space-between',
            }}
          >
            {/* Sort button */}
            <TouchableOpacity
              style={[
                styles.filterBtn,
                {
                  backgroundColor: theme.inputBoxColor,
                  borderColor: theme.muted,
                },
              ]}
              onPress={() => setSortAsc(v => !v)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: K.fontSizeConstants.regular,
                  }}
                >
                  Sort by Date
                </Text>
                <Text
                  style={{
                    color: theme.text,
                    fontSize: K.fontSizeConstants.headings,
                    fontWeight: 'bold',
                  }}
                >
                  {sortAsc ? '↑' : '↓'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Status filter dropdown */}
            <Dropdown
              style={[
                styles.dropdown,
                {
                  backgroundColor: theme.inputBoxColor,
                  borderColor: theme.muted,
                },
              ]}
              data={[
                { label: 'All', value: null },
                ...statuses.map((s: any) => ({
                  label: s.label,
                  value: s.value,
                })),
              ]}
              labelField="label"
              valueField="value"
              placeholder="Filter by status"
              value={statusFilter}
              onChange={item => setStatusFilter(item.value)}
              placeholderStyle={{ color: theme.subText }}
              selectedTextStyle={{ color: theme.text }}
            />
          </View>
        </View>

        {/* Paginated leads list */}
        <FlatList
          data={displayedLeads}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          renderItem={renderLead}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ margin: 16 }} /> : null
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,

  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginRight: 8,
    fontSize: 16,
  },
  filterBtn: {
    marginHorizontal: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
    flex:1
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardId: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  cardName: {
    fontSize: 16,
    marginBottom: 2,
  },
  cardProject: {
    fontSize: 15,
    marginBottom: 2,
    color: '#555',
  },
  cardStatus: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 13,
    color: '#888',
  },
  dropdown: {
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginHorizontal: 2,
    flex: 1,
  },
});

export default LeadsListScreen;
