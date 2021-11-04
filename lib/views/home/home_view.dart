import 'package:client/model/LNNode.dart';
import 'package:flutter/material.dart';
import 'package:material_floating_search_bar/material_floating_search_bar.dart';

class HomeView extends StatelessWidget {
  const HomeView({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Theme.of(context).backgroundColor,
        appBar: AppBar(
          title: Text(title),
          centerTitle: false,
          primary: true,
          elevation: 0,
          leading: Container(),
        ),
        body: Stack(
          fit: StackFit.expand,
          children: [
            _buildMainView(context),
            _buildFloatingSearchBar(context),
          ],
        ));
  }

  Widget _buildMainView(BuildContext context) {
    return Column(
      children: [
        Spacer(),
        Expanded(child: _buildScrollView(context))
      ],
    );
  }

  /// Build the search bar.
  Widget _buildFloatingSearchBar(BuildContext context) {
    final isPortrait =
        MediaQuery.of(context).orientation == Orientation.portrait;

    return FloatingSearchBar(
      backgroundColor: Theme.of(context).cardColor,
      hint: 'Search with node id',
      scrollPadding: const EdgeInsets.only(top: 16, bottom: 56),
      transitionDuration: const Duration(milliseconds: 800),
      transitionCurve: Curves.easeInOut,
      physics: const BouncingScrollPhysics(),
      axisAlignment: isPortrait ? 0.0 : 0.0,
      openAxisAlignment: 0.0,
      width: isPortrait ? 600 : 500,
      debounceDelay: const Duration(milliseconds: 500),
      onQueryChanged: (query) {
        // Call your model, bloc, controller here.
      },
      // Specify a custom transition to be used for
      // animating between opened and closed stated.
      transition: CircularFloatingSearchBarTransition(),
      actions: [
        FloatingSearchBarAction(
          showIfOpened: false,
          child: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () {},
          ),
        ),
        FloatingSearchBarAction.searchToClear(
          showIfClosed: false,
        ),
      ],
      builder: (context, transition) {
        return ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Material(
            color: Colors.white,
            elevation: 4.0,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: Colors.accents.map((color) {
                return Container(height: 112, color: color);
              }).toList(),
            ),
          ),
        );
      },
    );
  }

  /// Build the scroll view with all the informations
  Widget _buildScrollView(BuildContext context) {
    var nodes = [LNNode(nodeId: "one")];
    return CustomScrollView(slivers: [
      SliverList(
          delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Center(child: _buildLNNodeCard(context, nodes[index]));
        },
        childCount: nodes.length,
      ))
    ]);
  }

  /// Build card view about the node
  Widget _buildLNNodeCard(BuildContext context, LNNode node) {
    return Text(node.nodeId);
  }
}
