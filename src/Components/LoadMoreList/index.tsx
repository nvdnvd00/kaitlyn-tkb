import Box from 'Components/Box';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import useMount from 'react-use/lib/useMount';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

interface LoadMoreListProps {
	getData: (page: number) => void;
	renderItem: ({ item, index }: any) => any;
}

const LoadMoreList = ({ renderItem = () => null, getData, ...rest }: LoadMoreListProps) => {
	const [list, setList] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	useMount(() => {
		fetchData();
	});
	useUpdateEffect(() => {
		fetchData();
	}, [page]);
	const fetchData = async () => {
		setLoading(true);
		const {
			data: { data },
			error,
		}: any = await getData(page);
		setLoading(false);
		if (error) {
			return;
		}
		setList(page === 1 ? data : [...list, ...data]);
	};
	const renderHeader = () => {
		if (!loading) return null;
		if (page !== 1) return null;
		return <ActivityIndicator />;
	};
	return (
		<FlatList
			keyboardShouldPersistTaps={'always'}
			maxToRenderPerBatch={10}
			style={{ flex: 1, backgroundColor: 'transparent' }}
			contentContainerStyle={[{ paddingVertical: 0 }]}
			showsVerticalScrollIndicator={false}
			data={list ?? []}
			renderItem={renderItem}
			onEndReachedThreshold={0.5}
			onEndReached={() => {
				setPage((p: number) => p + 1);
			}}
			keyExtractor={(item: any, index: number) => item.id + '_' + index + ''}
			ListHeaderComponent={() => renderHeader()}
			refreshControl={
				<RefreshControl
					refreshing={loading}
					onRefresh={() => {
						if (page === 1) {
							fetchData();
						} else {
							setPage(1);
						}
					}}
					tintColor={'#fff'}
				/>
			}
			ItemSeparatorComponent={() => <Box mt='s' mr='s' />}
			ListEmptyComponent={() => null}
			{...rest}
		/>
	);
};

export default LoadMoreList;
